import { getPageMetadata } from "@/config/metadata";
import NotificationsClient from "./notificationsClient";

export const generateMetadata = () => getPageMetadata("Notifications");

export default function NotificationsPage() {
  return <NotificationsClient />;
}
