"use client";

import dynamic from "next/dynamic";

const CustomPackageBuilderView = dynamic(() => import("@/views/tour/custom-package-builder/customPackageBuilder"), { ssr: false });

export default function CustomPackageBuilderClient() {
  return <CustomPackageBuilderView />;
}
