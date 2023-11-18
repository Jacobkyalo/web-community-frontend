import { Client, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const DB_ID = import.meta.env.VITE_DB_ID;
export const COLL_ID = import.meta.env.VITE_COLL_ID;
export const BUCKET_ID = import.meta.env.VITE_BUCKET_ID;
