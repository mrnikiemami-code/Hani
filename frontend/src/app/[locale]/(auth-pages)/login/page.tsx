import { getPageMetadata } from "@/config/metadata";
import LoginClient from "./loginClient";

export const generateMetadata = () => getPageMetadata("Login");

export default function LoginPage() {
  return <LoginClient />;
}
