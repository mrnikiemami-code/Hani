import { getPageMetadata } from "@/config/metadata";
import ContactUsClient from "./contactUsClient";

export const generateMetadata = () => getPageMetadata("Contact Us");

export default function ContactUsPage() {
  return <ContactUsClient />;
}
