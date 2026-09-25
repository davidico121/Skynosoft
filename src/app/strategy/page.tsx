import { redirect } from "next/navigation";
import { SITE_URL } from "@/lib/content";

export default function StrategyIndex() {
  redirect(SITE_URL);
}
