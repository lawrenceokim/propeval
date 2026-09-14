export function DataSkeleton({ label = "Loading data", wide = false }: { label?: string; wide?: boolean }) {
  return <span className={`skeleton data-skeleton${wide ? " data-skeleton-wide" : ""}`} role="status" aria-label={label}><span className="sr-only">{label}</span></span>;
}

export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return <div aria-busy="true" aria-label="Loading records">{Array.from({ length: rows }, (_, index) => <div className="compact-row" key={index}><div className="compact-copy"><DataSkeleton wide /><DataSkeleton /></div><DataSkeleton /></div>)}</div>;
}

export function TableRowsSkeleton({ columns }: { columns: readonly string[] }) {
  return <>{Array.from({ length: 5 }, (_, index) => <tr key={index} aria-busy="true" aria-label="Loading record">{columns.map((column, columnIndex) => <td key={column} data-primary={columnIndex === 0 ? true : undefined} data-label={column}><div className={columnIndex === 0 ? "primary-cell" : undefined}><DataSkeleton wide />{columnIndex === 0 ? <DataSkeleton /> : null}</div></td>)}</tr>)}</>;
}

export function DashboardListSkeleton({ kind }: { kind: "occupancy" | "arrivals" | "maintenance" }) {
  const rows = kind === "maintenance" ? 5 : 4;
  return <div className={kind === "occupancy" ? "occupancy-list" : kind === "arrivals" ? "arrival-list" : "maintenance-overview"} aria-busy="true" aria-label="Loading records">
    {Array.from({ length: rows }, (_, index) => kind === "occupancy" ? <div className="occupancy-row" key={index}><div className="occupancy-meta"><span><DataSkeleton wide /><DataSkeleton /></span><DataSkeleton /></div><div className="skeleton progress-track" /></div> : kind === "arrivals" ? <div className="arrival-row" key={index}><span className="skeleton date-tile" /><div className="arrival-details"><DataSkeleton wide /><DataSkeleton wide /></div><DataSkeleton /></div> : <article className="maintenance-summary" key={index}><span className="skeleton priority-bar" /><div className="maintenance-copy"><DataSkeleton wide /><DataSkeleton /></div><div className="badge-group"><DataSkeleton /><DataSkeleton /></div></article>)}
  </div>;
}
