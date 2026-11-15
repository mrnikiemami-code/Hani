import type { Metadata } from "next";
import { base_path } from "../environment";

const APP_NAME = "DreamsTour - Travel and Tour Booking Next.js template";
const DEFAULT_DESCRIPTION =
  "DreamsTour - A premium Bootstrap 5 template crafted for travel and tour booking. Tailored for travel agencies and booking platforms, it features flight, hotel, and tour reservations, and holiday packages.";

export const getPageMetadata = (pageName: string): Metadata => ({
  title: `${pageName} | ${APP_NAME}`,
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: `${base_path}favicon.png`,
    shortcut: `${base_path}favicon.png`,
    apple: `${base_path}favicon.png`,
  },
});
