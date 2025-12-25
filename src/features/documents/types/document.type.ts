import { DocumentRole, User } from "@/types";

export interface DocumentUser {
  id: string;
  user: User;
  document: Document;
  role: DocumentRole;
  joinedAt: string;
}

export interface Document {
  id: string;
  title: string;
  content?: string | null;
  createdAt: string;
  updatedAt: string;
}
