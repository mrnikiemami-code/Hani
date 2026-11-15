import { getPageMetadata } from "@/config/metadata";
import ForgotPasswordClient from "./forgotPasswordClient";

export const generateMetadata = () => getPageMetadata("Forgot Password");

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
