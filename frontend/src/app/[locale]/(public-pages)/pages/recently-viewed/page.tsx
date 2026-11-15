import { getPageMetadata } from "@/config/metadata";
import RecentlyViewedClient from "./recentlyViewedClient";

export const generateMetadata = () => getPageMetadata("Recently Viewed");

export default function RecentlyViewedPage() {
  return <RecentlyViewedClient />;
}
