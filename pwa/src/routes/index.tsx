import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhotoDrop } from "../components/photoDrop";
import { useChat } from "../hooks/chat";
import { Message } from "../context/chat";
import { useMoondream } from "../hooks/moondream";

// todo :: remove this mock data and replace with real data from the 311 API
const quickActions = [
  { id: "1", label: "Noise Complaint", icon: "🔊", category: "noise" },
  { id: "2", label: "Parking Issue", icon: "🚗", category: "parking" },
  { id: "3", label: "Pothole", icon: "🕳️", category: "pothole" },
  { id: "4", label: "Trash/Recycling", icon: "🗑️", category: "garbage" },
  { id: "5", label: "Street Light", icon: "💡", category: "lights" },
  { id: "6", label: "Graffiti", icon: "🎨", category: "graffiti" },
];
export type QuickActions = typeof quickActions;

function Index() {
  const navigate = useNavigate({ from: "/" });
  const { addMessage, clearMessages } = useChat();
  const { query, pipelineStatus } = useMoondream();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const startReport = () => {
    if (!capturedPhoto) {
      return; // Prevent empty reports
    }

    const userMessage: Message = {
      role: "user",
      content: [],
      timestamp: new Date(),
    };

    if (capturedPhoto) {
      userMessage.content.push({ type: "image", url: capturedPhoto });
    }

    clearMessages();
    addMessage(userMessage);

    // If there's a photo, query the AI with the structured prompt
    if (capturedPhoto) {
      const structuredPrompt = `what 311 claim does this image depict? "decay_sidewalk", "overflow_trash", "rodents", "illegal_parking", or none`;
      console.log("Structured Prompt:", structuredPrompt);
      query({
        imageUrl: capturedPhoto,
        prompt: structuredPrompt,
      });

      // Navigate to the chat view
      navigate({ to: "/chat" });
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* 311 Complaint Input Form */}
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-m p-4">
        <legend className="fieldset-legend text-2xl font-semibold">
          Quick Report
        </legend>
        <PhotoDrop
          capturedPhoto={capturedPhoto}
          setCapturedPhoto={setCapturedPhoto}
        />
        <button
          onClick={startReport}
          disabled={!capturedPhoto || pipelineStatus === "working"}
          className="btn btn-primary w-full"
        >
          {pipelineStatus === "working" ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Start Report"
          )}
        </button>
      </fieldset>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Common Issues</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => {}}
              className="btn btn-outline h-20 flex-col items-center justify-center space-y-1"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});