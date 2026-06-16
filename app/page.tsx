"use client";

import { useState } from "react";
import { HabitForm } from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import type { Habit } from "./types/habit";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editingId, setEditingId] =
    // nullの可能性があるときは型にもnullが必要
    useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // ページリロードを防止（データ保持のため）
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    if (editingId) {
      // 既存習慣を更新
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === editingId
            ? { ...habit, title: trimmed, content }
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
      };
      setHabits((prev) => [...prev, newHabit]);
    }

    setTitle("");
    setContent("");
  };

  const handleDelete = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
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
        <h2 id="new-habit-heading" className="card__title">
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
        <h2 className="text-2xl font-bold">一覧</h2>
        <HabitList
          habits={habits}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </section>
    </main>
  );
}
