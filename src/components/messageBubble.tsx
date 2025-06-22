import { Bot } from "lucide-react";
import { Message } from "../context/chat";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      {isUser ? null : (
        <div className="chat-image avatar btn btn-square">
          <Bot />
        </div>
      )}
      <div className={`chat-bubble ${isUser ? "chat-bubble-primary" : ""}`}>
        {/* Iterate over message.content to render text and images */}
        {message.content.map((item, index) => {
          if (item.type === "image") {
            return (
              <img
                key={index} // Use index as key for elements within the content array
                src={item.url}
                alt="Uploaded content"
                className="w-full max-w-xs h-auto object-cover rounded-lg mb-2"
              />
            );
          } else {
            return (
              // Only render paragraph if text content is not empty
              <p key={index} className={item.text ? "" : "hidden"}>
                {item.text}
              </p>
            );
          }
        })}
        <time className="text-xs opacity-50 mt-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
    </div>
  );
}