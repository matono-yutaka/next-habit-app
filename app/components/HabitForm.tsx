"use client";

import type { FormEventHandler } from "react";
import type { Habit } from "../types/habit";

interface HabitFormProps {
  title: Habit["title"];
  content: Habit["content"];
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isEditing?: boolean; // 親から毎回渡されてるので「？」はなくてもいいらしい(デフォルト値があるので残す)
  onCancel?: () => void; // ”
}

export function HabitForm({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  isEditing = false, // propsが渡されない場合のデフォルト値
  onCancel,
}: HabitFormProps) {
  return (
    <form className="habitForm" onSubmit={onSubmit}>
      <div className="field">
        <label className="field__label" htmlFor="habit-title">
          タイトル
        </label>
        <input
          id="habit-title"
          className="input"
          type="text"
          name="title"
          placeholder="例：毎朝ジョギングする"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)} // 入力された文字列をonTitleChangeに渡す
          required
        />
      </div>
      <div className="field">
        <label className="field__label" htmlFor="habit-content">
          内容
        </label>
        <textarea
          id="habit-content"
          className="textarea"
          name="content"
          placeholder="習慣の内容を書きます"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button className="btn btn--primary cursor-pointer" type="submit">
          {isEditing ? "更新する" : "追加する"}
        </button>
        {isEditing && (
          <button
            className="btn btn--ghost cursor-pointer"
            type="button" // フォーム送信を防ぐために必要
            onClick={onCancel}
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
}
