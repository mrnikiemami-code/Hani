import { getPageMetadata } from "@/config/metadata";
import PreferencesSettingsClient from "./preferencesSettingsClient";

export const generateMetadata = () => getPageMetadata("Preferences Settings");

export default function PreferencesSettingsPage() {
  return <PreferencesSettingsClient />;
}
