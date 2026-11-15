"use client";

import dynamic from "next/dynamic";

const Error404View = dynamic(() => import("@/views/pages/error/Error404"), { ssr: false });

export default function Error404Client() {
  return <Error404View />;
}
