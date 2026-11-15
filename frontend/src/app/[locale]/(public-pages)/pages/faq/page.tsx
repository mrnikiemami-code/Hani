import { getPageMetadata } from "@/config/metadata";
import FaqClient from "./faqClient";

export const generateMetadata = () => getPageMetadata("Faq");

export default function FaqPage() {
  return <FaqClient />;
}
