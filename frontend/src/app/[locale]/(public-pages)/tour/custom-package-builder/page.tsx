import { getPageMetadata } from "@/config/metadata";
import CustomPackageBuilderClient from "./customPackageBuilderClient";

export const generateMetadata = () => getPageMetadata("Custom Package Builder");

export default function CustomPackageBuilderPage() {
  return <CustomPackageBuilderClient />;
}
