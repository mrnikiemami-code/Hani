import { getPageMetadata } from "@/config/metadata";
import CarListClient from "./carListClient";

export const generateMetadata = () => getPageMetadata("Car List");

export default function CarListPage() {
  return <CarListClient />;
}
