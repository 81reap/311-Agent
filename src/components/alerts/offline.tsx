import { AlertCircle } from "lucide-react";

export default function OfflineAlert() {
  //const { isOnline } = useAppStore();
  const isOnline = false; // Replace with actual online status logic
  if (isOnline) return null;

  return (
    <div role="alert" className="alert alert-warning m-2">
      <AlertCircle />
      <span>You're offline. Reports will be sent when you reconnect.</span>
    </div> 
  );
}