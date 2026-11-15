import { getPageMetadata } from "@/config/metadata";
import WishlistClient from "./wishlistClient";

export const generateMetadata = () => getPageMetadata("Wishlist");

export default function WishlistPage() {
  return <WishlistClient />;
}
