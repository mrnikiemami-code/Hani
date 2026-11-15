import { getPageMetadata } from "@/config/metadata";
import RegisterClient from "./registerClient";

export const generateMetadata = () => getPageMetadata("Register");

export default function RegisterPage() {
  return <RegisterClient />;
}
