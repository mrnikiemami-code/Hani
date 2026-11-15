import { getPageMetadata } from "@/config/metadata";
import GalleryClient from "./galleryClient";

export const generateMetadata = () => getPageMetadata("Gallery");

export default function GalleryPage() {
  return <GalleryClient />;
}
