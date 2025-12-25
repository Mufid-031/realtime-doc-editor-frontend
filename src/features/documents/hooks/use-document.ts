import { useQuery } from "@tanstack/react-query";
import { documentKeys } from "./document.keys";
import { getDocument } from "../api/documents.api";

export const useDocument = (id?: string) => {
  return useQuery({
    queryKey: documentKeys.detail(id!),
    queryFn: () => getDocument(id!),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};
