import { useNetworkState } from "@uidotdev/usehooks";
import { MapPin, Wifi, WifiOff } from "lucide-react";

export function Header() {
  const network = useNetworkState();

  return (
    <header className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        <div className="flex items-center space-x-3">
          <div role="button" className="btn btn-primary btn-square">
            311
          </div>
          <div role="button" className="btn btn-ghost text-xl font-bold">
            311 Agent
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex items-center space-x-2">
          <div role="button" className="btn btn-primary text-success">
            <MapPin />
            <span>NYC</span>
          </div>
          <div role="button" className="btn btn-primary btn-square">
            {network.online ? (
              <Wifi className="text-success" />
            ) : (
              <WifiOff className="text-error" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}