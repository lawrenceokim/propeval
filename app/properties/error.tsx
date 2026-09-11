"use client";
import { Icon } from "@/components/ui/icon";
export default function PropertiesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="state-card" role="alert"><span className="state-icon error"><Icon name="properties" /></span><h1>Unable to load properties</h1><p>We couldn’t retrieve the portfolio. Check the connection and try again.</p><button className="button button-primary" onClick={reset}>Try again</button></div>; }
