import { useNetworkState } from "@uidotdev/usehooks";
import { Wifi, WifiOff } from "lucide-react";

export default function NetworkButton() {
  const network = useNetworkState();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-primary btn-square">
        {network.online ? (
          <Wifi className="text-success" />
        ) : (
          <WifiOff className="text-error" />
        )}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64"
      >
        <li className="menu-title">
          <span>Network Status</span>
        </li>
        {network.online ? (
          <>
            <li>
              <a>
                <span className="font-semibold">Downlink:</span>
                <span>{network.downlink} Mbps</span>
              </a>
            </li>
            <li>
              <a>
                <span className="font-semibold">Round Trip Time:</span>
                <span>{network.rtt} ms</span>
              </a>
            </li>
            <li>
              <a>
                <span className="font-semibold">Connection:</span>
                <span className="capitalize">{network.effectiveType}</span>
              </a>
            </li>
          </>
        ) : (
          <li>
            <a className="text-error font-semibold">Status: Offline</a>
          </li>
        )}
        <div className="divider my-1"></div>
        <li>
          <a>
            {network.online ? "Online" : "Offline"}
          </a>
        </li>
      </ul>
    </div>
  );
}