import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "../api/documents.api";
import { documentKeys } from "./document.keys";

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: documentKeys.lists(),
      });
    },
  });
};
