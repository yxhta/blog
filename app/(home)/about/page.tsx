import type { Metadata } from "next";
import { SocialLinks } from "@/widgets/social-links";

export const metadata: Metadata = {
  title: "About - yxhta について",
  description: "yxhta の自己紹介ページです。",
};

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold">YOTA ITO</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          ヘルスケア領域のスタートアップでソフトウェアエンジニアをしています。
          主にフロントエンド、バックエンドや設計に関するテーマを扱っています。
        </p>
      </header>

      <SocialLinks />
    </div>
  );
}
