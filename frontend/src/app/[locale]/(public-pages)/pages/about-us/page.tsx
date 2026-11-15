import { getPageMetadata } from "@/config/metadata";
import AboutUsClient from "./aboutUsClient";

export const generateMetadata = () => getPageMetadata("About Us");

export default function AboutUsPage() {
  return <AboutUsClient />;
}
