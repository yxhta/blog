import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { HomeLayout } from "@/widgets/home-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
