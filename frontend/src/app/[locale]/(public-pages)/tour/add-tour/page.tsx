import { getPageMetadata } from "@/config/metadata";
import AddTourClient from "./addTourClient";

export const generateMetadata = () => getPageMetadata("Add Tour");

export default function AddTourPage() {
  return <AddTourClient />;
}
