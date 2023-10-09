import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("652388d55943b0de9c9d");

export const databases = new Databases(client);
export const DB_ID = "65238afd9b068dabc6b1";
export const COLL_ID = "65238b2a36687c3d797c";
