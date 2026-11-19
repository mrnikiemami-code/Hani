"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HubConnectionBuilder } from "@microsoft/signalr";

/**
 * Joins the authenticated SignalR support group for one ticket and refreshes
 * the server-rendered thread on new messages or dispute changes. A slow
 * polling fallback keeps the page fresh if the hub is unavailable.
 */
export function SupportAutoRefresh({
  ticketId,
  includeInternal = false
}: {
  ticketId: string;
  includeInternal?: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5099";
    const connection = new HubConnectionBuilder()
      .withUrl(`${apiBase}/hubs/support`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    connection.on("SupportMessageAdded", (payload: {
      ticketId?: string;
      isInternal?: boolean;
    }) => {
      if (
        payload.ticketId === ticketId &&
        (includeInternal || !payload.isInternal)
      ) {
        router.refresh();
      }
    });
    connection.on("SupportDisputeUpdated", (payload: { ticketId?: string }) => {
      if (payload.ticketId === ticketId) {
        router.refresh();
      }
    });

    connection
      .start()
      .then(() => connection.invoke("JoinTicket", ticketId))
      .catch(() => {
        // Polling fallback below keeps the thread usable.
      });

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, 60_000);

    return () => {
      window.clearInterval(timer);
      connection.invoke("LeaveTicket", ticketId).catch(() => undefined);
      connection.stop().catch(() => undefined);
    };
  }, [includeInternal, router, ticketId]);

  return null;
}
