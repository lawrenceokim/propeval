import "server-only";

import { Suspense, type ReactNode } from "react";

interface DataRegionProps<T> {
  source?: Promise<T>;
  fallback: ReactNode;
  children: (data: T) => ReactNode;
}

async function ResolvedData<T>({ source, children }: {
  source: Promise<T>;
  children: (data: T) => ReactNode;
}) {
  return children(await source);
}

// The same static shell is used by the page and its prefetched loading route.
// Each region reads a shared promise, so splitting UI does not repeat queries.
export function DataRegion<T>({ source, fallback, children }: DataRegionProps<T>) {
  if (!source) return fallback;
  return <Suspense fallback={fallback}><ResolvedData source={source}>{children}</ResolvedData></Suspense>;
}
