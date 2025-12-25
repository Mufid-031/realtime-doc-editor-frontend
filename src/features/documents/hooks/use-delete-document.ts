import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument } from "../api/documents.api";
import { documentKeys } from "./document.keys";

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: documentKeys.lists(),
      });
    },
  });
};
