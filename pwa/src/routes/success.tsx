import { createFileRoute, Link } from "@tanstack/react-router"
import { Check } from "lucide-react";

function SuccessView() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
        <Check className="w-10 h-10 text-success" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Report Submitted!</h2>
      <p className="opacity-70 mb-2">
        Your 311 report has been successfully submitted.
      </p>
      <div className="badge badge-outline badge-primary mb-6">
        Reference #: 311-{Date.now().toString().slice(-6)}
      </div>
      <p className="text-sm opacity-60 mb-8">
        <p>// todo :: log the expected form data</p>
        <p>// todo :: log the expected form url</p>
        <p>// todo :: maybe have moondream agentically handle this</p>
      </p>
      <Link to="/" className="btn btn-secondary w-full mb-4">
        Submit Another Report
      </Link>
    </div>
  );
}

export const Route = createFileRoute("/success")({
  component: SuccessView,
})