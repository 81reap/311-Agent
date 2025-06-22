import { AlertTriangle, MapPin } from "lucide-react";
import { useGeolocation } from "@uidotdev/usehooks";

export default function GeoLocationButton() {
  const state = useGeolocation();

  const getButtonContent = () => {
    if (state.loading) {
      return (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          <span>Locating...</span>
        </>
      );
    }
    if (state.error) {
      return (
        <>
          <AlertTriangle className="text-error" />
          <span>Error</span>
        </>
      );
    }
    return (
      <>
        <MapPin className="text-success" />
        <span>Location</span>
      </>
    );
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-primary">
        {getButtonContent()}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80"
      >
        <li className="menu-title">
          <span>Geolocation</span>
        </li>
        {state.loading && (
          <li>
            <a>Loading...</a>
          </li>
        )}
        {state.error && (
          <li>
            <a className="text-error whitespace-normal">
              Error: {state.error.message}
            </a>
          </li>
        )}
        {!state.loading && !state.error && (
          <>
            <li>
              <a>
                <span className="font-semibold">Latitude:</span>
                <span>{state.latitude}</span>
              </a>
            </li>
            <li>
              <a>
                <span className="font-semibold">Longitude:</span>
                <span>{state.longitude}</span>
              </a>
            </li>
            {state.accuracy && (
              <li>
                <a>
                  <span className="font-semibold">Accuracy:</span>
                  <span>{state.accuracy}</span>
                </a>
              </li>
            )}
            <div className="divider my-1"></div>
            <li>
              <a>Updated at {new Date(state.timestamp!).toLocaleTimeString()}</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}