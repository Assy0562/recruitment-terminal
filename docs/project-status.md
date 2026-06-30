# Project Status

Recruitment Terminal の現在地を短く把握するためのメモです。AI と作業するときは、まずこのファイルだけ確認すれば大体の前提が分かる状態を目指します。

## 現在の状態

- Next.js + TypeScript + Tailwind CSS + App Router で実装中。
- DB / ログイン機能なし。
- データは `src/data/*.json` のローカル JSON で管理。
- 公開求人タグ検索、候補表示、詳細ページは実装済み。
- タグ選択状態と候補カードの展開状態は保持する方針。
- ダーク / ライトテーマ対応済み。
- GitHub / Vercel 公開済み。

## 主な画面

- トップ画面: タグ選択、選択中タグ、求人候補一覧。
- 詳細画面: 立ち絵、レアリティ、名前、職業/職分、SD、戦闘情報、特性、素質、スキル。

## よく触るファイル

- `src/components/RecruitmentApp.tsx`: トップ画面の状態管理。
- `src/components/CombinationCandidates.tsx`: 求人候補の組み合わせ表示。
- `src/components/OperatorCard.tsx`: 候補内のオペレーターカード。
- `src/app/operators/[id]/page.tsx`: オペレーター詳細画面。
- `src/components/OperatorSdModel.tsx`: SD と戦闘情報カード。
- `src/lib/recruit.ts`: タグ検索ロジック。
- `src/types/operator.ts`: 型定義。
- `src/data/operators.json`: オペレーター基本データ。
- `src/data/operatorRanges.json`: 攻撃範囲データ。
- `src/data/operatorDisplaySettings.json`: 詳細画面の立ち絵表示補正。

## 作業再開

ユーザーが `作業再開` と言ったら:

1. ローカルサーバーを起動する。
2. URL はコードブロックに入れず、普通のテキストで報告する。
3. 必要に応じてこのファイルと、対象ファイルだけ確認する。

## 作業終了

ユーザーが `作業終了` と言ったら:

1. 必要なら lint / build / push の状況を確認する。
2. ローカルサーバーを停止する。
3. 簡潔に報告する。

## AI 協業ルール

- 通常は `docs/project-status.md` だけ確認する。
- 大きな設計変更や外向け説明が必要なときだけ `README.md` も確認する。
- ファイルの役割確認や学習説明が必要なときだけ `docs/file-roles.md` を確認する。
- 大きい JSON は丸ごと読まず、必要な ID や項目だけ確認する。
- ユーザーが対象外とした画面やロジックは触らない。
- 既存の未コミット差分は、依頼と無関係なら commit に含めない。

## 検証方針

- コード/UI変更: `npm run lint` と `npm run build` を確認する。
- ドキュメントのみ: 原則 lint/build は不要。
- push 前: `git status --short` で対象外差分が混ざっていないか確認する。

## 報告形式

基本は以下だけでよいです。

- 実施内容
- 変更ファイル
- 動作確認結果
- 残課題

## 次に改善しそうなこと

- 詳細画面の立ち絵表示バランス調整。
- `operatorDisplaySettings.json` の補正値整理。
- データ更新フローの整理。
- アクセシビリティ改善。
- 学習用 docs の必要最小限の維持。
