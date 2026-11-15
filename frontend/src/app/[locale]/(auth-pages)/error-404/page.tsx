import { getPageMetadata } from "@/config/metadata";
import Error404Client from "./error404Client";

export const generateMetadata = () => getPageMetadata("Error 404");

export default function Error404Page() {
  return <Error404Client />;
}
