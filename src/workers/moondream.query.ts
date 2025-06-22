import {
  AutoProcessor,
  AutoTokenizer,
  Moondream1ForConditionalGeneration,
  PreTrainedModel,
  PretrainedProcessorOptions,
  PreTrainedTokenizer,
  Processor,
  RawImage,
  Tensor,
} from "@huggingface/transformers";

// todo :: depedency injection this pipeline somehow
const model_id = "Xenova/moondream2";
export interface MoondreamPipeline {
  readonly processor: Processor;
  readonly tokenizer: PreTrainedTokenizer;
  readonly model: PreTrainedModel;
}
let cachedPipeline: MoondreamPipeline;
const getPipeline = async () => {
  if (!cachedPipeline) {
    console.log("Initializing Moondream pipeline...");
    const processor = await AutoProcessor.from_pretrained(model_id, {} as PretrainedProcessorOptions);  
    const tokenizer = await AutoTokenizer.from_pretrained(model_id);
    const model = await Moondream1ForConditionalGeneration.from_pretrained(
      model_id,
      {
        dtype: {
          embed_tokens: "fp16", // or 'fp32'
          vision_encoder: "fp16", // or 'q8'
          decoder_model_merged: "q4", // or 'q4f16' or 'q8'
        },
        device: "webgpu", // or 'cpu'
      },
    );
    cachedPipeline = {
      processor: processor,
      tokenizer: tokenizer,
      model: model,
    }
  }
  return cachedPipeline;
}

export interface WorkerEventData {
  readonly imageUrl: string;
  readonly prompt: string;
}
self.onmessage = async (event: MessageEvent) => {
  console.log("Worker received message:", event.data);
  const { imageUrl, prompt } = event.data as WorkerEventData;
  const { model, tokenizer, processor } = await getPipeline();

  const text = `<image>\n\nQuestion: ${prompt}\n\nAnswer:`;
  const text_inputs = tokenizer(text);

  const image = await RawImage.fromURL(imageUrl);
  const vision_inputs = await processor(image);

  console.log("Generating response with Moondream model...");
  const output = await model.generate({
    ...text_inputs,
    ...vision_inputs,
    do_sample: false,
    max_new_tokens: 64,
  }) as Tensor;

  // The output contains the full text, including the prompt.
  // We can decode and then extract just the answer.
  console.log("Decoding output...");
  const decoded = tokenizer.batch_decode(output, {
    skip_special_tokens: true,
  });
  const answer = decoded[0].split("Answer:")[1].trim();

  // Send the final result back
  self.postMessage({ status: "complete", output: answer });
}
