"use client";

import { useEffect, useState } from "react";
// useParamsはサーバーコンポーネントでは使えない
// ルートパラメータを取得するためのフック
// navigationはURLルーティング関連機能の集まり
import { useParams } from "next/navigation";
// @はルートディレクトリもしくは../../types~
import type { Habit } from "@/app/types/habit";
import Link from "next/link";
import styles from "./HabitDetail.module.css";

export default function HabitDetailPage() {
  // ルートパラメータを取得するためのフック
  const params = useParams<{ id: string }>();
  const [habits, setHabits] = useState<Habit[]>([]);

  // ページタイトルを変更
  // clientコンポーネントではmetadataは使えない
  useEffect(() => {
    document.title = "習慣詳細";
  }, []); // 初回レンダリング後に実行

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      // JSON文字列をオブジェクトに変換後stateにセット
      setHabits(JSON.parse(storedHabits));
    }
  }, []); //初回レンダリング後に実行（state変更あればもう一度レンダリング）

  const habit = habits.find((h) => h.id === params.id);
  // undefinedの場合でもこれがあれば、下の{habit.title}に辿り着かないのでエラーにならない
  if (!habit) {
    return <p className={styles.habitNotFound}>習慣が見つかりません。</p>;
  }

  return (
    <div className={styles.habitDetail}>
      <h1 className={styles.habitTitle}>タイトル：{habit.title}</h1>
      <p className={styles.habitContent}>内容: {habit.content}</p>
      <p className={styles.habitDate}>
        作成日: {new Date(habit.createdAt).toLocaleString()}
        {/* new Date()で日付オブジェクトに変換し、toLocaleString()で日本語表記に変換 */}
      </p>
      <Link href={`/`} className={styles.backLink}>
        一覧へ戻る
      </Link>
    </div>
  );
}
