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

// This interface remains the same for incoming messages
export interface WorkerEventData {
  readonly imageUrl: string;
  readonly prompt: string;
}

// Define the pipeline components
interface MoondreamPipeline {
  readonly processor: Processor;
  readonly tokenizer: PreTrainedTokenizer;
  readonly model: PreTrainedModel;
}

// --- Worker Logic ---

const model_id = "Xenova/moondream2";
let pipeline: MoondreamPipeline | null = null;

async function initializePipeline() {
  try {
    self.postMessage({ status: "initializing" });
    console.log("Initializing Moondream pipeline...");

    const processor = await AutoProcessor.from_pretrained(
      model_id,
      {} as PretrainedProcessorOptions,
    );
    const tokenizer = await AutoTokenizer.from_pretrained(model_id);
    const model = await Moondream1ForConditionalGeneration.from_pretrained(
      model_id,
      {
        dtype: {
          embed_tokens: "fp16",
          vision_encoder: "fp16",
          decoder_model_merged: "q4",
        },
        device: "webgpu",
      },
    );

    pipeline = { processor, tokenizer, model };
    self.postMessage({ status: "ready" });
    console.log("Moondream pipeline ready.");
  } catch (error) {
    console.error("Pipeline initialization failed:", error);
    self.postMessage({ status: "error", error: (error as Error).message });
  }
}

// Listen for messages from the main thread
self.onmessage = async (event: MessageEvent<WorkerEventData>) => {
  if (!pipeline) {
    console.error("Pipeline not initialized. Cannot process message.");
    return;
  }

  try {
    console.log("Worker received message:", event.data);
    const { imageUrl, prompt } = event.data;
    const { model, tokenizer, processor } = pipeline;

    const text = `<image>\n\nQuestion: ${prompt}\n\nAnswer:`;
    const text_inputs = tokenizer(text);

    const image = await RawImage.fromURL(imageUrl);
    const vision_inputs = await processor(image);

    console.log("Generating response with Moondream model...");
    const output = (await model.generate({
      ...text_inputs,
      ...vision_inputs,
      do_sample: false,
      max_new_tokens: 64,
    })) as Tensor;

    console.log("Decoding output...");
    const decoded = tokenizer.batch_decode(output, {
      skip_special_tokens: true,
    });
    const answer = decoded[0].split("Answer:")[1].trim();

    // Send the final result back
    self.postMessage({ status: "complete", output: answer });
  } catch (error) {
    console.error("Query processing failed:", error);
    self.postMessage({ status: "error", error: (error as Error).message });
  }
};

// Initialize the pipeline as soon as the worker is created
initializePipeline();