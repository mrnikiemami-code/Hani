import { getPageMetadata } from "@/config/metadata";
import ProfileSettingsClient from "./profileSettingsClient";

export const generateMetadata = () => getPageMetadata("Profile Settings");

export default function ProfileSettingsPage() {
  return <ProfileSettingsClient />;
}
