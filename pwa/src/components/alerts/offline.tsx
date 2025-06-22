import { useNetworkState } from "@uidotdev/usehooks";
import { CloudAlert } from "lucide-react";

export default function OfflineAlert() {
  const network = useNetworkState();
  if (network.online) return null;

  return (
    <div role="alert" className="alert alert-warning m-2">
      <CloudAlert />
      <span>You're offline. Reports will be sent when you reconnect.</span>
    </div> 
  );
}