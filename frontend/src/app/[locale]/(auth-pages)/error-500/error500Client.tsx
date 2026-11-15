"use client";

import dynamic from "next/dynamic";

const Error500View = dynamic(() => import("@/views/pages/error/Error500"), { ssr: false });

export default function Error500Client() {
  return <Error500View />;
}
