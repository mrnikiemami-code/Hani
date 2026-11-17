"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Italic,
  Link,
  List,
  Paragraph,
  Table,
  TableToolbar,
  Underline
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

/**
 * CKEditor 5 (GPL distribution) used by the content CMS. This module is loaded
 * client-side only because the editor touches the DOM during initialization.
 */
export default function CkEditorImpl({
  value,
  onChange,
  ariaLabel
}: {
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}) {
  return (
    <div aria-label={ariaLabel}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Link,
            List,
            Heading,
            BlockQuote,
            Table,
            TableToolbar
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "insertTable"
          ]
        }}
        onChange={(_event, editor) => onChange(editor.getData())}
      />
    </div>
  );
}
