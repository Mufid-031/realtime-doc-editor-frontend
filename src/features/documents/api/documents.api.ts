import { api } from "@/lib/axios";

export const getDocuments = async () => {
  const res = await api.get("/documents");
  return res.data;
};

export const getDocument = async (id: string) => {
  const res = await api.get(`/documents/${id}`);
  return res.data;
};

export const createDocument = async (title: string) => {
  const res = await api.post("/documents", { title });
  return res.data;
};

export const updateDocument = async (
  id: string,
  payload: { title?: string; content?: string }
) => {
  const res = await api.patch(`/documents/${id}`, payload);
  return res.data;
};

export const deleteDocument = async (id: string) => {
  await api.delete(`/documents/${id}`);
};
