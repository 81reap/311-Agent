import { createContext } from "react";

// Define the shape of different content types within a message
export interface TextContent {
  type: "text";
  text: string;
}

export interface ImageContent {
  type: "image";
  url: string;
}

// Define the shape of a single message
export interface Message {
  role: "system" | "user";
  content: (TextContent | ImageContent)[];
  timestamp: Date;
}

// Define the state and functions our context will provide
export interface ChatContextState {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

// Create and export the context with a default value
export const ChatContext = createContext<ChatContextState | undefined>(
  undefined,
);