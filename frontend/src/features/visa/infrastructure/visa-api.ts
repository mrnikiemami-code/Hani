import { apiGet } from "@/lib/hani/api";
import type { VisaSearchItem } from "../domain/visa-search";

export async function searchVisas(locale: string): Promise<VisaSearchItem[]> {
  const result = await apiGet<VisaSearchItem[]>(
    `/market/v1/visas?locale=${encodeURIComponent(locale)}`
  );

  return (result ?? []).filter(
    (item) => !item.name.includes("???") && !item.name.includes("�")
  );
}
