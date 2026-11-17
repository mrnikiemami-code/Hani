"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  Autoformat,
  BlockQuote,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  HorizontalLine,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  Paragraph,
  RemoveFormat,
  SpecialCharacters,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableToolbar,
  Underline
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

const fontFamilies = [
  "default",
  "Vazirmatn, Tahoma, sans-serif",
  "Noto Kufi Arabic, Tahoma, sans-serif",
  "Arial, sans-serif",
  "Tahoma, sans-serif",
  "Georgia, serif",
  "Courier New, monospace"
];

/**
 * CKEditor 5 (GPL distribution) used by the content CMS. This module is loaded
 * client-side only because the editor touches the DOM during initialization.
 */
export default function CkEditorImpl({
  value,
  onChange,
  ariaLabel,
  locale = "en"
}: {
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  locale?: string;
}) {
  const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";
  return (
    <div
      aria-label={ariaLabel}
      className={`hani-rich-editor ${
        direction === "rtl" ? "hani-rich-editor--rtl" : ""
      }`}
      dir={direction}
    >
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",
          language: {
            content: locale === "fa" ? "fa" : locale === "ar" ? "ar" : "en"
          },
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Subscript,
            Superscript,
            Code,
            CodeBlock,
            Link,
            List,
            Heading,
            Alignment,
            Autoformat,
            BlockQuote,
            Table,
            TableToolbar,
            FontFamily,
            FontSize,
            FontColor,
            FontBackgroundColor,
            Indent,
            IndentBlock,
            HorizontalLine,
            RemoveFormat,
            FindAndReplace,
            SpecialCharacters
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "fontFamily",
            "fontSize",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "|",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "alignment",
            "|",
            "link",
            "bulletedList",
            "numberedList",
            "outdent",
            "indent",
            "|",
            "blockQuote",
            "code",
            "codeBlock",
            "insertTable",
            "horizontalLine",
            "specialCharacters",
            "findAndReplace",
            "|",
            "removeFormat"
          ],
          fontFamily: {
            options: fontFamilies,
            supportAllValues: true
          },
          fontSize: {
            options: [10, 12, 14, 16, 18, 20, 24, 30, 36],
            supportAllValues: true
          },
          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
          }
        }}
        onChange={(_event, editor) => onChange(editor.getData())}
      />
    </div>
  );
}
