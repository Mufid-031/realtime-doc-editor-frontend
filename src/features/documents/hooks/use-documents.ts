import { useQuery } from "@tanstack/react-query";
import { documentKeys } from "./document.keys";
import { getDocuments } from "../api/documents.api";

export const useDocuments = () => {
  return useQuery({
    queryKey: documentKeys.all,
    queryFn: getDocuments,
  });
};
