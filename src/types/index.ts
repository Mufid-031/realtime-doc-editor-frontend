export enum DocumentRole {
  OWNER = "owner",
  EDITOR = "editor",
  VIEWER = "viewer",
}

export type User = {
  id: string;
  name: string;
  email: string;
  documents?: Document[] | null;
};

export type DocumentUser = {
  id: string;
  user: User;
  document: Document;
  role: DocumentRole;
  joinedAt: string;
};

export type Document = {
  id: string;
  title: string;
  content?: string | null;
  users: DocumentUser[];
  createdAt: string;
  updatedAt: string;
};
