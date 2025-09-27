// types/custom-session.ts
import { Session } from "next-auth";

export interface CustomSession extends Session {
  accessToken?: string;
  error?: string;
}
export default CustomSession;
