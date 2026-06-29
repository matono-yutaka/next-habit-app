"use client";

import type { Habit } from "../types/habit";
import Link from "next/link";

interface HabitListProps {
  habits: Habit[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function HabitList({ habits, onDelete, onEdit }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <p className="habit-empty">
        習慣はまだありません。上のフォームから追加してください。
      </p>
    );
  }

  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <li key={habit.id} className="habit-card">
          <Link
            href={`/habits/${habit.id}`}
            className="text-blue-700 hover:underline font-bold"
          >
            {habit.title}
          </Link>
          <p className="habit-card__body">{habit.content}</p>
          <div className="habit-card__actions">
            <button
              className="btn btn--ghost cursor-pointer"
              type="button"
              onClick={() => onEdit(habit.id)} // クリック時に実行するための無名関数
            >
              編集
            </button>
            <button
              className="btn btn--danger cursor-pointer"
              type="button"
              onClick={() => onDelete(habit.id)}
            >
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
