export function count<T>(items: T[] | null | undefined): number {
  return Array.isArray(items) ? items.length : 0;
}
