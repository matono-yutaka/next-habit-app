# Next Habit App

Next.js と TypeScript で作成した簡易習慣管理アプリです。Next.jsとReact学習のために作成しました。

## 概要

- **習慣の追加**
- **習慣の編集**
- **習慣の削除**
- **習慣一覧から詳細ページへの遷移**
- **ブラウザの localStorage にデータ保存**

サーバーサイドのデータベースは使わず、クライアント側でブラウザストレージに保存する構成です。

## 使用技術

- Next.js 16.2.9
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- App Router

## 使い方

### 開発サーバー起動

```bash
npm install
npm run dev
```

ブラウザで次の URL を開きます。

```bash
http://localhost:3000
```

### 本番ビルド

```bash
npm run build
npm start
```

## アプリの構成

- `app/page.tsx` - ホームページ。習慣の一覧表示と追加・編集フォームを持つクライアントページ。
- `app/components/HabitForm.tsx` - 習慣の追加・編集フォームコンポーネント。
- `app/components/HabitList.tsx` - 習慣リスト表示コンポーネント。
- `app/habits/[id]/page.tsx` - 習慣の詳細ページ。
- `app/globals.css` - 全体のスタイル定義。
- `app/types/habit.ts` - 習慣データの型定義。

## 動作の流れ

1. `app/page.tsx` でブラウザの `localStorage` から保存済み習慣を読み込む。
2. 習慣を追加・編集・削除すると、`habits` 配列を更新し、`localStorage` に保存する。
3. タイトルをクリックすると、`app/habits/[id]/page.tsx` で詳細ページへ遷移する。

## 注意点

- `localStorage` に保存されるため、別ブラウザや別端末ではデータは共有されません。
- ブラウザのストレージを消すとデータは復元できません。

## スクリプト

- `npm run dev` - 開発サーバー起動
- `npm run build` - 本番ビルド
- `npm start` - 本番サーバー起動
- `npm run lint` - ESLint 実行
