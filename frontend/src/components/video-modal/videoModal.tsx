"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "../../hooks/useScrollLock";

interface VideoModalProps {
  show: boolean;
  handleClose: () => void;
  videoUrl: string;
}

const YOUTUBE_ID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/;

/** Resolves a share URL to something an iframe can play, mirroring what GLightbox does in the HTML template. */
const toEmbedUrl = (url: string) => {
  const id = YOUTUBE_ID.exec(url)?.[1];
  if (id) return { kind: "iframe" as const, src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` };
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { kind: "video" as const, src: url };
  return { kind: "iframe" as const, src: url };
};

/** Full-screen video lightbox (dark overlay, centered player, close button) — replaces the HTML `data-fancybox` video popup. */
const VideoModal = ({ show, handleClose, videoUrl }: VideoModalProps) => {
  useScrollLock(show);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, handleClose]);

  if (!show) return null;
  const media = toEmbedUrl(videoUrl);

  return createPortal(
    <div className="video-lightbox" role="dialog" aria-modal="true" aria-label="Video" onClick={handleClose}>
      <button type="button" className="video-lightbox-close" aria-label="Close" onClick={handleClose}>
        <i className="ti ti-x" />
      </button>
      <div className="video-lightbox-content" onClick={(e) => e.stopPropagation()}>
        {media.kind === "video" ? (
          <video src={media.src} controls autoPlay />
        ) : (
          <iframe
            src={media.src}
            title="Video player"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>,
    document.body,
  );
};

export default VideoModal;
