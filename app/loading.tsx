// ルート遷移時にページの準備が完了するまで表示されるローディング画面
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-2xl font-bold">読み込み中...</p>
    </div>
  );
}
