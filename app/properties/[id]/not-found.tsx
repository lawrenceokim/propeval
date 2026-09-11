import Link from "next/link";
import { Icon } from "@/components/ui/icon";
export default function PropertyNotFound() { return <div className="state-card"><span className="state-icon"><Icon name="properties" /></span><h1>Property not found</h1><p>This property may have been removed or the link may be incorrect.</p><Link className="button button-primary" href="/properties">Back to properties</Link></div>; }
