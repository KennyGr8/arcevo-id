/**
 * Splits an array into chunks of a given size.
 * @param array The array to split.
 * @param size The size of each chunk.
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

/**
 * Processes items in chunks by invoking an async insert function on each chunk.
 * @param items The array of items to insert.
 * @param size The chunk size.
 * @param insertFn The async function to call with each chunk.
 */
export async function insertInChunks<T>(
  items: T[],
  size: number,
  insertFn: (chunk: T[]) => Promise<void>
) {
  const chunks = chunkArray(items, size);
  for (const chunk of chunks) {
    await insertFn(chunk);
  }
}
