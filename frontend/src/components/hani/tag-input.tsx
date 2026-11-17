"use client";

import { useState } from "react";

/**
 * Tag editor with removable chips. Used by the media and content admin forms
 * instead of a comma-separated text field.
 */
export function TagInput({
  tags,
  onChange,
  placeholder,
  addLabel,
  removeLabel
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
  addLabel: string;
  removeLabel: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    if (!tags.some((tag) => tag.toLowerCase() === value.toLowerCase())) {
      onChange([...tags, value]);
    }
    setDraft("");
  };

  return (
    <div>
      <div className="d-flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="badge bg-light text-dark border d-inline-flex align-items-center gap-2 py-2"
          >
            {tag}
            <button
              type="button"
              className="btn-close"
              style={{ fontSize: 8 }}
              aria-label={`${removeLabel}: ${tag}`}
              onClick={() => onChange(tags.filter((item) => item !== tag))}
            />
          </span>
        ))}
      </div>
      <div className="input-group">
        <input
          className="form-control"
          value={draft}
          placeholder={placeholder}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="btn btn-light" onClick={add}>
          {addLabel}
        </button>
      </div>
    </div>
  );
}
