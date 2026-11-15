import { getPageMetadata } from "@/config/metadata";
import NotificationSettingsClient from "./notificationSettingsClient";

export const generateMetadata = () => getPageMetadata("Notification Settings");

export default function NotificationSettingsPage() {
  return <NotificationSettingsClient />;
}
