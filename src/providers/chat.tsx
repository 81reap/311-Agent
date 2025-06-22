import { PropsWithChildren, useCallback, useState } from "react";
import {
  ChatContext,
  Message,
} from "../context/chat";

const mockMessages: Message[] = [
  {
    role: "system",
    content: [
      {
        type: "text",
        text: "You are a friendly chatbot who always responds in the style of a pirate",
      },
    ],
    timestamp: new Date("04-20-2002"),
  },
  {
    role: "user",
    content: [
      {
        type: "image",
        url: "http://images.cocodataset.org/val2017/000000039769.jpg",
      },
      { type: "text", text: "What are these?" },
    ],
    timestamp: new Date(),
  },
];

export function ChatProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value = {
    messages,
    addMessage,
    clearMessages,
    isLoading,
    setIsLoading,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}