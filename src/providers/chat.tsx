import { PropsWithChildren, useCallback, useState } from "react";
import {
  ChatContext,
  Message,
} from "../context/chat";

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