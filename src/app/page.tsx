import { Header } from "@/components/Header";
import { RecruitmentApp } from "@/components/RecruitmentApp";

export default function Home() {
  return (
    <>
      {/* トップページは共通ヘッダーと求人検索アプリ本体を組み合わせるだけにする。 */}
      <Header />
      <RecruitmentApp />
    </>
  );
}
