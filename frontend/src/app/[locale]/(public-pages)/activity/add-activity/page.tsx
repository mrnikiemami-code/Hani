import { getPageMetadata } from "@/config/metadata";
import AddActivityClient from "./addActivityClient";

export const generateMetadata = () => getPageMetadata("Add Activity");

export default function AddActivityPage() {
  return <AddActivityClient />;
}
