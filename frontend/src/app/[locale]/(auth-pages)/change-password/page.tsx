import { getPageMetadata } from "@/config/metadata";
import ChangePasswordClient from "./changePasswordClient";

export const generateMetadata = () => getPageMetadata("Change Password");

export default function ChangePasswordPage() {
  return <ChangePasswordClient />;
}
