"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Habit } from "@/app/types/habit";
import Link from "next/link";
import styles from "./HabitDetail.module.css";

export default function HabitDetailPage() {
  const params = useParams<{ id: string }>();
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    document.title = "習慣詳細";
  }, []);

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  const habit = habits.find((h) => h.id === params.id);

  if (!habit) {
    return <p className={styles.habitNotFound}>習慣が見つかりません。</p>;
  }

  return (
    <div className={styles.habitDetail}>
      <h1 className={styles.habitTitle}>タイトル：{habit.title}</h1>
      <p className={styles.habitContent}>内容: {habit.content}</p>
      <p className={styles.habitDate}>
        作成日: {new Date(habit.createdAt).toLocaleString()}
      </p>
      <Link href={`/`} className={styles.backLink}>
        一覧へ戻る
      </Link>
    </div>
  );
}
