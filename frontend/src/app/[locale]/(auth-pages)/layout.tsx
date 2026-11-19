export const dynamic = "force-dynamic";

import AuthLayout from "@/layout/authLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
