import { getPageMetadata } from "@/config/metadata";
import MyProfileClient from "./myProfileClient";

export const generateMetadata = () => getPageMetadata("My Profile");

export default function MyProfilePage() {
  return <MyProfileClient />;
}
