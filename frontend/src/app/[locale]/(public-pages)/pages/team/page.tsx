import { getPageMetadata } from "@/config/metadata";
import TeamClient from "./teamClient";

export const generateMetadata = () => getPageMetadata("Team");

export default function TeamPage() {
  return <TeamClient />;
}
