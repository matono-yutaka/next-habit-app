"use client";

import { useState, useEffect } from "react";
import { HabitForm } from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import type { Habit } from "./types/habit";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editingId, setEditingId] =
    // nullの可能性があるときは型にもnullが必要
    // ジェネリクス(型)を書かないと初期値から型をnullと推論してしまう。文字列を入力するとエラーになる。
    useState<string | null>(null);

  useEffect(() => {
    // ローカルストレージから習慣を取得
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    // habitsが更新されるたびにローカルストレージに保存
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits, hasLoaded]);

  if (!hasLoaded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-2xl font-bold">読み込み中...</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // ページリロードを防止（データ保持のため）
    e.preventDefault();
    // trim()がないとスペースだけでも登録できてしまう。
    const trimmed = title.trim();
    if (!trimmed) return;

    if (editingId) {
      // 既存習慣を更新
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === editingId
            ? // ...habitで該当の習慣一件をコピー、「title:〜}」で上書き
              { ...habit, title: trimmed, content }
            : habit,
        ),
      );
      setEditingId(null);
    } else {
      // 新規習慣を追加
      const newHabit: Habit = {
        id: Date.now().toString(),
        title: trimmed,
        content,
        createdAt: new Date().toISOString(),
      };
      // [...habits, newHabit]でも登録できるが、最新のstateを安全に使うため関数形式(prev)で更新
      setHabits((prev) => [...prev, newHabit]);
    }

    setTitle("");
    setContent("");
  };

  const handleDelete = (id: string) => {
    // stateを元に次のstateを作るならprevを使う。->   複数回連続で更新しても常に最新のstateを参照できる。
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const habit = habits.find((h) => h.id === id);
    // find()は undefined を返す可能性があるためチェックが必要（if文）
    if (habit) {
      setEditingId(id);
      setTitle(habit.title);
      setContent(habit.content);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">習慣管理アプリ</h1>
      <section className="card" aria-labelledby="new-habit-heading">
        <h2 id="new-habit-heading" className="card__title font-bold">
          {editingId ? "習慣を編集" : "新規習慣"}
        </h2>
        <HabitForm
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSubmit={handleSubmit}
          // idではなく「編集中かどうか」だけ渡す
          isEditing={editingId !== null}
          onCancel={handleCancel}
        />
      </section>
      <section className="card" aria-labelledby="list-heading">
        <h2 id="list-heading" className="text-2xl font-bold">
          習慣一覧
        </h2>
        <HabitList
          habits={habits}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </section>
    </main>
  );
}
