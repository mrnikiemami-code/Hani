import type {
  ContentEntryStatus,
  ContentEntryType
} from "../domain/content-entry";

/** Translation keys for content entry types; enum values stay canonical. */
export const CONTENT_TYPE_LABEL_KEYS: Record<ContentEntryType, string> = {
  Page: "typePage",
  Banner: "typeBanner",
  Article: "typeArticle",
  Section: "typeSection"
};

/** Translation keys for content lifecycle states. */
export const CONTENT_STATUS_LABEL_KEYS: Record<ContentEntryStatus, string> = {
  Draft: "statusDraft",
  Published: "statusPublished",
  Scheduled: "statusScheduled",
  Archived: "statusArchived"
};
