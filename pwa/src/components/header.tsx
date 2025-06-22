import { Bot } from "lucide-react";
import GeoLocationButton from "./geoLocationButton.tsx";
import NetworkButton from "./networkButton.tsx";
import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        <div className="flex items-center space-x-3">
          <Link to="/" role="button" className="btn btn-primary btn-square">
            <Bot />
          </Link>
          <Link to="/" role="button" className="btn btn-ghost text-xl font-bold">
            311 Agent
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex items-center space-x-2">
          <GeoLocationButton />
          <NetworkButton />
        </div>
      </div>
    </header>
  );
}