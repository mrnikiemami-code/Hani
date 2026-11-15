import { getPageMetadata } from "@/config/metadata";
import ReviewClient from "./reviewClient";

export const generateMetadata = () => getPageMetadata("Review");

export default function ReviewPage() {
  return <ReviewClient />;
}
