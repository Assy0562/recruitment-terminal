# ファイル構成と役割メモ

このドキュメントは、Recruitment Terminal の各ファイルが何を担当しているかを学習用にまとめたものです。

## まず読む順番

1. `src/app/page.tsx`
2. `src/components/RecruitmentApp.tsx`
3. `src/lib/recruit.ts`
4. `src/components/CombinationCandidates.tsx`
5. `src/components/OperatorCard.tsx`
6. `src/app/operators/[id]/page.tsx`
7. `src/types/operator.ts`

この順番で読むと、「トップページから始まり、タグ選択、候補計算、カード表示、詳細ページ、型定義」という流れで理解しやすいです。

## 全体の流れ

```text
src/app/page.tsx
  -> Header を表示
  -> RecruitmentApp を表示

RecruitmentApp
  -> operators.json と tags.json を読み込む
  -> selectedTags を state として管理する
  -> getTagCombinationCandidates で候補を計算する
  -> TagSelector / SelectedTags / CombinationCandidates に渡す

CombinationCandidates
  -> タグ組み合わせ候補をカード表示する
  -> 各候補内で OperatorCard を表示する

OperatorCard
  -> /operators/[id] へのリンクになる

src/app/operators/[id]/page.tsx
  -> operators.json から対象オペレーターを探す
  -> 画像、職業、特性、素質、スキル、攻撃範囲などを表示する
```

## ルート直下のファイル

### `README.md`

プロジェクトの概要、機能、使用技術、開発コマンドなどを書く説明ファイルです。

GitHub のリポジトリトップにも表示されるので、外から見に来た人に向けた入口になります。

### `package.json`

プロジェクト名、依存パッケージ、実行コマンドを管理するファイルです。

主なコマンド:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### `package-lock.json`

実際にインストールされた npm パッケージの正確なバージョンを記録します。

手で編集するファイルではなく、`npm install` や `npm ci` によって更新されます。

### `next.config.ts`

Next.js の設定ファイルです。

このプロジェクトでは、`next/image` で外部画像を表示できるように、`cdn.jsdelivr.net` などの画像ドメインを許可しています。

### `tsconfig.json`

TypeScript の設定ファイルです。

`@/components/...` のようなパス alias も、この設定によって使えるようになっています。

### `eslint.config.mjs`

ESLint の設定ファイルです。

コードの書き方や潜在的なミスをチェックするために使います。

### `postcss.config.mjs`

Tailwind CSS を PostCSS 経由で動かすための設定ファイルです。

### `next-env.d.ts`

Next.js が自動生成する TypeScript 用の型定義ファイルです。

通常は編集しません。

### `.gitignore`

Git に含めないファイルやフォルダを指定します。

例: `node_modules`、`.next`、環境変数ファイルなど。

## `src/app`

Next.js App Router のルートです。URL と画面の対応を管理します。

### `src/app/layout.tsx`

アプリ全体を包むレイアウトです。

主な役割:

- 全ページ共通の HTML 構造を定義する
- `globals.css` を読み込む
- メタデータを設定する
- 初回表示時にライト / ダークテーマを反映する script を埋め込む

学習ポイント:

- `children` には各ページの中身が入る
- `suppressHydrationWarning` はテーマ切り替えのように、サーバーとブラウザで初期表示がズレる可能性がある場合に使われる

### `src/app/page.tsx`

トップページです。

主な役割:

- `Header` を表示する
- `RecruitmentApp` を表示する

このファイル自体は薄くしてあり、実際の状態管理や UI はコンポーネント側に分けています。

### `src/app/globals.css`

全体の CSS です。

主な役割:

- Tailwind CSS の読み込み
- 全体の背景、文字色、テーマ用スタイル
- `terminal-panel` や `terminal-button` など、共通で使う見た目のクラス定義

学習ポイント:

- Tailwind の utility class だけで書く部分と、共通クラスとしてまとめる部分の使い分けを見るとよいです。

### `src/app/operators/[id]/page.tsx`

オペレーター詳細ページです。

`[id]` は動的ルートで、`/operators/char_225_haak` のような URL に対応します。

主な役割:

- URL の `id` から対象オペレーターを探す
- 対象が見つからない場合は `notFound()` を呼ぶ
- オペレーターの立ち絵、レアリティ、職業、配置、特性、素質、スキルを表示する
- `operatorEnglishNames.json` を使って英語名を表示する
- `operatorRanges.json` を使って攻撃範囲を表示する
- `OperatorSdModel` で SD モデル動画を表示する

学習ポイント:

- `generateStaticParams()` は、詳細ページを静的生成するための URL 一覧を Next.js に渡している
- `generateMetadata()` は、ページごとの title を作っている
- 同じファイル内に小さな表示用コンポーネントを置いて、詳細ページ専用の UI をまとめている

## `src/components`

画面を組み立てるための再利用可能な部品です。

### `src/components/Header.tsx`

ページ上部のヘッダーです。

主な役割:

- アプリ名を表示する
- サブタイトルを表示する
- `ThemeToggle` を表示する

### `src/components/ThemeToggle.tsx`

ライト / ダークテーマを切り替えるボタンです。

主な役割:

- 現在のテーマを React state で持つ
- `localStorage` にテーマを保存する
- `document.documentElement` に `light` / `dark` class を付け替える

学習ポイント:

- ブラウザ専用 API を使うため `"use client"` が必要
- `useEffect` で state の変化を DOM と localStorage に反映している

### `src/components/RecruitmentApp.tsx`

トップページの中心になるコンポーネントです。

主な役割:

- `operators.json` と `tags.json` を読み込む
- 選択中タグ `selectedTags` を管理する
- 最大選択数を 5 個に制限する
- 選択中タグを `sessionStorage` に保存する
- `getTagCombinationCandidates()` で候補結果を計算する
- `TagSelector`、`SelectedTags`、`CombinationCandidates` を並べる

学習ポイント:

- `useState` で UI の状態を管理している
- `useEffect` で sessionStorage との同期をしている
- `useMemo` で、タグが変わったときだけ候補計算をし直している

### `src/components/TagSelector.tsx`

タグ選択欄全体を表示するコンポーネントです。

主な役割:

- タグカテゴリごとに `TagGroup` を表示する
- タグが最大数まで選ばれているかを判定する

### `src/components/TagGroup.tsx`

カテゴリ単位のタグボタン群を表示します。

主な役割:

- カテゴリ名を表示する
- 各タグをボタンとして表示する
- 選択済みタグの見た目を変える
- 最大選択数に達したら未選択タグを disabled にする

学習ポイント:

- `map()` を使って配列からボタン一覧を作っている
- 選択状態によって className を切り替えている

### `src/components/SelectedTags.tsx`

現在選ばれているタグを表示するコンポーネントです。

主な役割:

- 選択中タグを表示する
- タグをクリックして個別解除できるようにする
- `RESET` ボタンで全解除する
- `選択数 / 最大数` を表示する

### `src/components/CombinationCandidates.tsx`

タグ組み合わせ候補の一覧を表示します。

主な役割:

- タグ未選択時の案内を表示する
- 有効な組み合わせがない場合のメッセージを表示する
- 候補がある場合は `CandidateCard` を並べる
- 候補ごとに最低レアリティ、候補人数、タグ一覧を表示する
- 候補オペレーターを `OperatorCard` で表示する
- 表示件数が多い場合は開閉できるようにする

学習ポイント:

- `selectedTags` と `candidates` の状態によって表示内容を分岐している
- `CandidateCard` はこのファイル専用の内部コンポーネントとして定義されている

### `src/components/OperatorCard.tsx`

候補一覧に表示されるオペレーターカードです。

主な役割:

- オペレーター画像、名前、職業、配置、レアリティ、タグを表示する
- `Link` を使って詳細ページへ遷移する
- タグが多い場合は一部だけ表示し、残り件数を `+N` で表す

学習ポイント:

- `next/image` で画像を最適化表示している
- `next/link` でページ遷移している

### `src/components/OperatorSdModel.tsx`

オペレーター詳細ページで SD モデル動画を表示するコンポーネントです。

主な役割:

- 英語名から wiki.gg の `.webm` URL を組み立てる
- 動画が読み込めない場合は `No SD Data` を表示する
- 子要素 `children` として、ブロック数や攻撃範囲などの補足 UI を受け取る

学習ポイント:

- `useMemo` で URL 生成を最適化している
- `onError` で動画読み込み失敗時の fallback を実装している
- `children` を使うと、コンポーネントの中に別の UI を差し込める

## `src/lib`

画面表示に直接依存しないロジックを置く場所です。

### `src/lib/recruit.ts`

公開求人タグの検索ロジックをまとめたファイルです。

主な役割:

- 選択タグに一致するオペレーターを絞り込む
- オペレーターをレアリティ順に並べる
- レアリティを `★` 表示に変換する
- オペレーターをレアリティごとにグループ化する
- 選択タグから 1 個から 3 個までのタグ組み合わせを作る
- 各組み合わせに一致する候補オペレーターを計算する
- 最低レアリティ、タグ数、候補人数をもとに候補を並び替える

学習ポイント:

- UI から切り離された純粋な関数が多いので、テストを書きやすい
- `createCombinations()` は再帰でタグ組み合わせを作っている
- `filter()`、`map()`、`sort()` の使い方を学びやすい

## `src/data`

アプリで使う静的データです。

### `src/data/operators.json`

オペレーター本体のデータです。

主な情報:

- ID
- 名前
- レアリティ
- 職業
- 配置
- タグ
- 画像 URL
- 特性
- 素質
- スキル

### `src/data/tags.json`

公開求人タグのカテゴリ一覧です。

`TagSelector` と `TagGroup` で、タグボタンを作るために使います。

### `src/data/operatorEnglishNames.json`

オペレーター ID と英語名の対応表です。

詳細ページで英語名を表示したり、`OperatorSdModel` が SD 動画 URL を組み立てたりするために使います。

### `src/data/operatorRanges.json`

オペレーターごとの攻撃範囲データです。

詳細ページの `RangePanel` で、マス目として表示するために使います。

## `src/types`

TypeScript の型定義を置く場所です。

### `src/types/operator.ts`

オペレーター関連の型を定義しています。

主な型:

- `Rarity`
- `Operator`
- `TagCategory`
- `OperatorDetailItem`

学習ポイント:

- JSON データを安全に扱うために型を用意している
- コンポーネントの props やロジック関数で同じ型を使うことで、データ構造のズレに気づきやすくなる

## データと状態の関係

```text
固定データ
  operators.json
  tags.json
  operatorEnglishNames.json
  operatorRanges.json

ユーザー操作で変わる状態
  selectedTags

計算結果
  combinationCandidates

画面表示
  TagSelector
  SelectedTags
  CombinationCandidates
  OperatorCard
  OperatorDetailPage
```

`operators.json` や `tags.json` は基本的に固定データです。

一方、`selectedTags` はユーザーがクリックするたびに変わります。その変化をもとに `combinationCandidates` が再計算され、画面が更新されます。

## Server Component と Client Component

Next.js App Router では、何も書かなければ基本的に Server Component です。

このプロジェクトでは、以下のように使い分けています。

### Server Component

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/operators/[id]/page.tsx`

主にデータを読み、ページ構造を作ります。

### Client Component

ファイル先頭に `"use client"` があるものです。

- `src/components/RecruitmentApp.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/OperatorSdModel.tsx`
- `src/components/ThemeToggle.tsx`

主に `useState`、`useEffect`、クリック操作、localStorage / sessionStorage など、ブラウザ上で動く処理を担当します。

## 学習時の見どころ

- `RecruitmentApp.tsx`: React の state 管理の中心
- `recruit.ts`: タグ検索ロジックの中心
- `CombinationCandidates.tsx`: 条件分岐と一覧表示の練習に向いている
- `operators/[id]/page.tsx`: Next.js の動的ルートと詳細ページの作り方が見える
- `operator.ts`: TypeScript でデータ構造を表す方法が分かる
- `globals.css`: Tailwind と独自クラスを組み合わせたデザインの作り方が見える

## 今後整理するとよさそうな点

- `layout.tsx`、`Header.tsx`、`TagGroup.tsx`、`operator.ts` などに残っている文字化け文字列を修正する
- 詳細ページ内の小さなコンポーネントを、必要に応じて別ファイルに分ける
- `getBlockCount()` のようなロジックを `src/lib` 側へ移す
- `recruit.ts` にユニットテストを追加する
- `operatorRanges.json` のような大きいデータの作成元や更新手順を README か docs に残す
