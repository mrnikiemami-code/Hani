import { getPageMetadata } from "@/config/metadata";
import AddFlightClient from "./addFlightClient";

export const generateMetadata = () => getPageMetadata("Add Flight");

export default function AddFlightPage() {
  return <AddFlightClient />;
}
