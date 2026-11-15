import { getPageMetadata } from "@/config/metadata";
import Error500Client from "./error500Client";

export const generateMetadata = () => getPageMetadata("Error 500");

export default function Error500Page() {
  return <Error500Client />;
}
