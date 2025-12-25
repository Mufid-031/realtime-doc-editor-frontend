import { api } from "@/lib/axios";
import { Document, DocumentUser } from "@/types";

export const getDocuments = async (): Promise<DocumentUser[]> => {
  const res = await api.get("/documents");
  return res.data;
};

export const getDocument = async (id: string): Promise<Document> => {
  const res = await api.get(`/documents/${id}`);
  return res.data;
};

export const createDocument = async (title: string) => {
  const res = await api.post("/documents", { title });
  return res.data;
};

export const updateDocument = async (
  id: string,
  payload: Partial<Pick<Document, "title" | "content">>
): Promise<DocumentUser> => {
  const res = await api.patch(`/documents/${id}`, payload);
  return res.data;
};

export const deleteDocument = async (id: string): Promise<void> => {
  await api.delete(`/documents/${id}`);
};
