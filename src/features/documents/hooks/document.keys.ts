export const documentKeys = {
  all: ["documents"] as const,
  lists: () => [...documentKeys.all, "list"] as const,
  list: (filters?: unknown) => [...documentKeys.lists(), { filters }] as const,
  details: () => [...documentKeys.all, "details"] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
};
