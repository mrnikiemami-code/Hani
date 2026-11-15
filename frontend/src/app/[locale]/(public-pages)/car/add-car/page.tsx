import { getPageMetadata } from "@/config/metadata";
import AddCarClient from "./addCarClient";

export const generateMetadata = () => getPageMetadata("Add Car");

export default function AddCarPage() {
  return <AddCarClient />;
}
