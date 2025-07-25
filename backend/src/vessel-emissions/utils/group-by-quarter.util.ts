export function groupByQuarter<T extends { TOUTC: Date }>(
  emissions: T[],
): Map<string, T> {
  const grouped = new Map<string, T>();

  for (const e of emissions) {
    const date = new Date(e.TOUTC);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const quarter = Math.floor(month / 3) + 1;
    const key = `${year}-Q${quarter}`;

    const existing = grouped.get(key);
    if (!existing || new Date(e.TOUTC) > new Date(existing.TOUTC)) {
      grouped.set(key, e);
    }
  }

  return grouped;
}
