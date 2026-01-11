# AI Task Analytics Dashboard

モダンな技術スタックを使用して構築された、高機能タスク管理ダッシュボードです。

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)

## 主な機能

- **タスク管理**: 作成・編集・削除・ステータス変更
- **分析ダッシュボード**: 週間進捗、カテゴリ・優先度別の統計
- **高度なフィルタリング**: ステータス、優先度、カテゴリ、キーワード検索
- **ダークモード**: システム設定に連動 + 手動切り替え
- **データ永続化**: LocalStorageによる自動保存
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応

## 技術スタック

### フロントエンド
- **React 18** - コンポーネントベースUI
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストCSS
- **Recharts** - データ可視化ライブラリ
- **Lucide React** - アイコンライブラリ

### ビルドツール
- **Vite** - 高速なビルド・開発サーバー
- **PostCSS** - CSSトランスフォーム
- **ESLint** - コード品質管理

## アーキテクチャ

```
src/
├── components/          # UIコンポーネント
│   ├── Header.tsx       # ヘッダー (ダークモード切り替え)
│   ├── StatsCards.tsx   # 統計カード
│   ├── Charts.tsx       # グラフ (棒グラフ、円グラフ)
│   ├── TaskFilters.tsx  # フィルター機能
│   ├── TaskList.tsx     # タスク一覧
│   ├── TaskItem.tsx     # 個別タスク
│   └── AddTaskForm.tsx  # タスク追加フォーム
├── hooks/               # カスタムフック
│   ├── useLocalStorage.ts  # LocalStorage連携
│   ├── useTasks.ts         # タスク管理ロジック
│   └── useDarkMode.ts      # ダークモード管理
├── types/               # TypeScript型定義
│   └── index.ts
├── utils/               # ユーティリティ関数
│   └── helpers.ts
├── App.tsx              # メインアプリケーション
├── main.tsx             # エントリーポイント
└── index.css            # グローバルスタイル
```

## 技術的なハイライト

### カスタムフック
- **useLocalStorage**: ジェネリクスを活用した型安全なLocalStorage管理
- **useTasks**: useMemo/useCallbackによる最適化されたタスク状態管理
- **useDarkMode**: システム設定連動 + ユーザー設定の永続化

### 型安全性
- 厳格なTypeScript設定
- 明示的な型定義 (Task, Priority, Category, TaskStatus)
- ジェネリクスによる再利用可能な型

### パフォーマンス
- useMemoによる計算結果のメモ化
- useCallbackによる関数の再生成防止
- 条件付きレンダリングの最適化

### UX/UI
- スムーズなアニメーション (fadeIn, slideUp)
- グラスモーフィズムヘッダー
- レスポンシブグリッドレイアウト
- アクセシビリティ対応 (aria-label, フォーカス管理)

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview
```

## 開発者情報

- GitHub: [@kenomoto3163](https://github.com/kenomoto3163)
- 興味分野: AI, 機械学習, Webアプリケーション開発

---

*Built with modern web technologies to demonstrate full-stack development capabilities.*
