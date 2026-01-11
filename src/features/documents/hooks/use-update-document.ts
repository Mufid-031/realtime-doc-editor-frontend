import { Document, DocumentUser } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDocument } from "../api/documents.api";
import { documentKeys } from "./document.keys";

export const useUpdateDocument = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Pick<Document, "title" | "content">>) =>
      updateDocument(id, payload),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: documentKeys.detail(id),
      });

      const previous = queryClient.getQueryData<DocumentUser>(
        documentKeys.detail(id)
      );

      queryClient.setQueryData<DocumentUser>(documentKeys.detail(id), (old) =>
        old ? { ...old, ...payload } : old
      );

      return { previous };
    },
    
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(documentKeys.detail(id), context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: documentKeys.detail(id),
      });
    },
  });
};
