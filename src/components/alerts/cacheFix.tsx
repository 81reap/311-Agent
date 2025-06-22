import { Info } from "lucide-react";

export default function CacheFixAlert() {
  return (
    <div role="alert" className="alert alert-info m-2">
      <Info />
      <span>If you are experiencing issues with the demo, <strong>please delete your cache</strong> and reload the page!</span>
      <button className="btn btn-sm btn-ghost" onClick={() => window.location.reload()}>
        Reload
      </button>
    </div> 
  );
}