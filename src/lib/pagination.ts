export const CATALOG_PAGE_SIZE = 10;

export function paginateCatalog<T>(items: readonly T[], requestedPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / CATALOG_PAGE_SIZE));
  const page = Math.min(totalPages, Math.max(1, requestedPage));
  const offset = (page - 1) * CATALOG_PAGE_SIZE;
  return {
    items: items.slice(offset, offset + CATALOG_PAGE_SIZE),
    page,
    totalPages,
    start: items.length ? offset + 1 : 0,
    end: Math.min(offset + CATALOG_PAGE_SIZE, items.length),
  };
}