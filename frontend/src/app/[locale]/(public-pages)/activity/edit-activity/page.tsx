import { getPageMetadata } from "@/config/metadata";
import EditActivityClient from "./editActivityClient";

export const generateMetadata = () => getPageMetadata("Edit Activity");

export default function EditActivityPage() {
  return <EditActivityClient />;
}
