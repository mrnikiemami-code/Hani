"use client";

import dynamic from "next/dynamic";

const TestimonialsView = dynamic(() => import("@/views/pages/testimonials/Testimonials"), { ssr: false });

export default function TestimonialsClient() {
  return <TestimonialsView />;
}
