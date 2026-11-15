"use client";

import dynamic from "next/dynamic";

const ContactUsView = dynamic(() => import("@/views/pages/contact/contactUs"), { ssr: false });

export default function ContactUsClient() {
  return <ContactUsView />;
}
