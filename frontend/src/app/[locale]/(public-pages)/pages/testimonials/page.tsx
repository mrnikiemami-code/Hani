import { getPageMetadata } from "@/config/metadata";
import TestimonialsClient from "./testimonialsClient";

export const generateMetadata = () => getPageMetadata("Testimonials");

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
