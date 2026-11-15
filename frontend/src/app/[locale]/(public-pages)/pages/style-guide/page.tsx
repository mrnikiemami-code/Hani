import { getPageMetadata } from "@/config/metadata";
import StyleGuideClient from "./styleGuideClient";

export const generateMetadata = () => getPageMetadata("Style Guide");

export default function StyleGuidePage() {
  return <StyleGuideClient />;
}
