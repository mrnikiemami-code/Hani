"use client";
import { useEffect, useRef } from 'react'

const TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  ["link", "image", "video"],
  ["clean"],
];

const FormEditors = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let instance: { off?: (event: string) => void } | undefined
    ;(async () => {
      const { default: Quill } = await import("quill")
      const host = editorRef.current
      if (cancelled || !host || host.classList.contains("ql-container")) return
      instance = new Quill(host, { theme: "snow", modules: { toolbar: TOOLBAR } })
    })()
    return () => {
      cancelled = true
      instance?.off?.("text-change")
    }
  }, [])

  return <div id="snow-editor" ref={editorRef} aria-label="Snow Editor"></div>
}

export default FormEditors
