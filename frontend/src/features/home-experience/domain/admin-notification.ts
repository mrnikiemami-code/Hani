export type AdminNotification = {
  id: string;
  userId: string | null;
  channel: string;
  templateKey: string;
  payload: string;
  status: string;
  createdAt: string;
  sentAt: string | null;
  attemptCount: number;
  lastError: string | null;
  nextAttemptAt: string | null;
};

export type AdminNotificationPage = {
  items: AdminNotification[];
  page: number;
  pageSize: number;
  total: number;
};
