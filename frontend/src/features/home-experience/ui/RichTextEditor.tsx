"use client";

import dynamic from "next/dynamic";

const CkEditorImpl = dynamic(() => import("./CkEditorImpl"), {
  ssr: false,
  loading: () => (
    <div className="form-control d-flex align-items-center text-gray-6" style={{ minHeight: 320 }}>
      Loading editor…
    </div>
  )
});

/**
 * Client-only CKEditor wrapper. The actual editor is loaded after hydration so
 * it never runs during static rendering.
 */
export function RichTextEditor(props: {
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  locale?: string;
}) {
  return <CkEditorImpl {...props} />;
}
