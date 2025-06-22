import { useEffect, useRef, useState } from "react";
import { Camera, Check, Send, X } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "../hooks/chat";
import { Message } from "../context/chat";
import MessageBubble from "../components/messageBubble";

function ChatView() {
  const { messages, addMessage, isLoading, setIsLoading } = useChat();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputText, setInputText] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const sendMessage = () => {
    if (!inputText.trim() && !capturedPhoto) {
      return; // Prevent sending empty messages
    }

    setIsLoading(true);

    const newUserMessage: Message = {
      role: "user",
      content: [],
      timestamp: new Date(),
    };

    if (capturedPhoto) {
      newUserMessage.content.push({ type: "image", url: capturedPhoto });
    }
    if (inputText.trim()) {
      newUserMessage.content.push({ type: "text", text: inputText.trim() });
    }

    addMessage(newUserMessage);
    setInputText("");
    setCapturedPhoto(null);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        role: "system",
        content: [
          {
            type: "text",
            text: "Aye, understood! I shall relay yer message to the high seas command!",
          },
        ],
        timestamp: new Date(),
      };
      addMessage(aiResponse);
      setIsLoading(false);
    }, 1500); // Simulate network delay
  };

  const submitReport = () => {
    setIsLoading(true);
    // Simulate API call for report submission
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmation(false);
      alert("Report submitted! Well done, matey!");
    }, 2000);
  };

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to the bottom of the chat when messages or loading state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) =>
        setCapturedPhoto(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content">
                <span className="text-xs font-bold">311</span>
              </div>
            </div>
            <div className="chat-bubble">
              <span className="loading loading-dots loading-md"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Bottom Section: Confirmation or Input */}
      <div className="p-4 border-t bg-base-100">
        {showConfirmation ? (
          <button
            onClick={submitReport}
            disabled={isLoading}
            className="btn btn-success w-full"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <Check className="w-5 h-5" />
            )}
            Submit 311 Report
          </button>
        ) : (
          <>
            <div className="flex space-x-2">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handlePhotoCapture}
                className="hidden"
              />
              <button
                className="btn btn-square btn-outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type your response..."
                className="input input-bordered w-full"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className="btn btn-primary btn-square"
                onClick={sendMessage}
                disabled={!inputText.trim() && !capturedPhoto}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            {capturedPhoto && (
              <div className="mt-2 indicator">
                <span
                  className="indicator-item badge badge-error cursor-pointer p-1"
                  onClick={() => setCapturedPhoto(null)}
                >
                  <X className="w-3 h-3" />
                </span>
                <img
                  src={capturedPhoto}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/chat")({
  component: ChatView,
});