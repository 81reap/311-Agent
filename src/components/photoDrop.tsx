import { useHover } from "@uidotdev/usehooks";
import { Camera, ImageUp, X } from "lucide-react";
import { useDeviceType } from "../hooks/deviceType";

interface PhotoDropProps {
  capturedPhoto: string | null;
  setCapturedPhoto: (photo: string | null) => void;
}

export function PhotoDrop({ capturedPhoto, setCapturedPhoto }: PhotoDropProps) {
  const [ref, hovering] = useHover();
  const { isDesktop } = useDeviceType();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) =>
        setCapturedPhoto(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) =>
        setCapturedPhoto(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) =>
            setCapturedPhoto(event.target?.result as string);
          reader.readAsDataURL(file);
        }
        break;
      }
    }
  };

  if (capturedPhoto) {
    return (
      <div className="relative w-full mb-4">
        <img
          src={capturedPhoto}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg"
        />
        <button
          className="btn btn-circle btn-sm btn-error absolute top-2 right-2"
          onClick={() => setCapturedPhoto(null)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onPaste={handlePaste}
      ref={ref}
      className={`card bg-base-100 text-center transition-all duration-200 border-2 mb-4 ${
        hovering ? "border-primary" : "border-dashed border-base-300"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        id="file-input"
        onChange={handleFileSelect}
      />
      <label htmlFor="file-input" className="cursor-pointer p-6 block">
        <div className="flex justify-center items-center gap-4">
          <div className="btn btn-secondary btn-circle shadow-lg size-20">
            <ImageUp className="size-10" />
          </div>
          <div className="btn btn-accent btn-circle shadow-lg size-20">
            <Camera className="size-10" />
          </div>
        </div>
        <p className="text-lg opacity-70 mt-4">
          {isDesktop
            ? "Click to browse, drag & drop, or paste an image"
            : "Tap to take a photo or select an image"}
        </p>
      </label>
    </div>
  );
}