import { useContext } from "react";
import { ChatContext, ChatContextState } from "../context/chat";

// Custom hook for easy consumption of the chat context
export function useChat(): ChatContextState {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}