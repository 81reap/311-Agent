import { useState } from "react";
import { useHover } from "@uidotdev/usehooks";
import { Camera, ImageUp } from "lucide-react";
import { useDeviceType } from "../hooks/deviceType";

export function PhotoDrop() {
  const [ ref, hovering ] = useHover();
  const { isDesktop } = useDeviceType();
  const [capturedPhoto, setCapturedPhoto] = useState("");

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => setCapturedPhoto(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCapturedPhoto(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div onDrop={handleDrop} ref={ref}
      className={`card bg-background-100 text-center -transition-all duration-200 border-2
        ${hovering ? "border-base-400 border-primary" : "border-dashed border-base-400"}`} >
      <input type="file" accept="image/*" capture="environment" className="hidden" id="file-input" onChange={handleFileSelect} />
      <label htmlFor="file-input" className="cursor-pointer">
        {capturedPhoto}
        <div className="p-6">
          <div className="btn btn-secondary btn-circle shadow-lg size-20 m-4">
            <ImageUp className="size-10"/>
          </div>
          <div className="btn btn-accent btn-circle shadow-lg size-20 m-4">
            <Camera className="size-10"/>
          </div>
          <p className="text-lg opacity-70">
            {isDesktop
              ? "Click to browse, drag & drop, or paste an image"
              : "Tap to take a photo or select an image"}
          </p>
        </div>
      </label>
    </div>
  )
}