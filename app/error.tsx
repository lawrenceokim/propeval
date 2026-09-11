"use client";
import { Icon } from "@/components/ui/icon";
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="state-card" role="alert"><span className="state-icon error"><Icon name="info" /></span><h1>Unable to load the workspace</h1><p>Something interrupted the request. Your data has not been changed.</p><button className="button button-primary" onClick={reset}>Try again</button></div>;
}
