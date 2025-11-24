
import dotenv from "dotenv";
dotenv.config();

import { ICredentials } from "data/salesPortal/types/credentials.types"; 

export const SALES_PORTAL_URL = process.env.SALES_PORTAL_URL!;
export const SALES_PORTAL_API_URL = "http://localhost:8686";

export const credentials: ICredentials = {
  username: process.env.USER_NAME!,
  password: process.env.USER_PASSWORD!,
};