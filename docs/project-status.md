# Project Status

このファイルは、Recruitment Terminal の現在地を短く把握するための作業メモです。
ChatGPT / Codex と協業するときは、まずこのファイルを確認します。

## 現在の状態

- Next.js + TypeScript + Tailwind CSS + App Router で実装中
- DB / ログイン機能なし
- データはローカルJSONで管理
- 公開求人タグ検索MVPは実装済み
- タグ選択状態は詳細ページから戻っても保持される
- オペレーター詳細ページを実装済み
- 詳細ページでは以下を表示中
  - 日本語名 / 英語名
  - レアリティ
  - 職業 / 職分 / 配置
  - 立ち絵
  - SDモデル
  - ブロック数
  - 昇進2ベースの攻撃範囲
  - 配置マス
  - 特性 / 素質 / スキル
- ダーク / ライトテーマ対応済み
- GitHub / Vercel 公開済み

## 次にやる候補

- UIの細かい違和感を調整する
- 検索結果の並び替えを検討する
- データ更新フローを整理する
- アクセシビリティを改善する
- 学習用コメントやdocsを必要最小限で整える

## 直近でよく触るファイル

- `src/app/page.tsx`
- `src/components/RecruitmentApp.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/OperatorCard.tsx`
- `src/app/operators/[id]/page.tsx`
- `src/components/OperatorSdModel.tsx`
- `src/lib/recruit.ts`
- `src/types/operator.ts`
- `src/data/operators.json`
- `src/data/tags.json`
- `src/data/operatorEnglishNames.json`
- `src/data/operatorRanges.json`

## ChatGPT と Codex の役割分担

### ChatGPT

- 方針整理
- UI改善案
- 学習相談
- ポートフォリオとしての見せ方相談
- READMEや説明文の草案作成

### Codex

- コード確認
- 実装
- リファクタリング
- `npm run lint` / `npm run build`
- ローカルサーバー起動 / 停止
- Git操作
- GitHubへのpush

## 作業開始時の流れ

ユーザーが「作業再開」と言ったら、Codexは以下を行います。

1. ローカルサーバーを起動する
2. 必要に応じて `docs/project-status.md` を確認する
3. 今日触るファイルを絞る
4. 実装や調査を始める

## 作業終了時の流れ

ユーザーが「作業終了」と言ったら、Codexは以下を行います。

1. 必要なら `npm run lint` / `npm run build` を確認する
2. 必要ならGitHubへpushする
3. ローカルサーバーを停止する
4. 作業状態を簡潔に報告する

## トークン消費を抑える頼み方

AIに依頼するときは、毎回プロジェクト全体を読ませず、対象を絞るとよいです。

例:

```text
docs/project-status.md と src/lib/recruit.ts だけ確認して進めて
```

```text
今回は詳細ページだけ見て。対象は src/app/operators/[id]/page.tsx と OperatorSdModel.tsx
```

```text
実装はまだしないで、方針だけ提案して
```

## 最低限維持するドキュメント

- `README.md`
  - 外部向けの概要、機能、起動方法
- `docs/file-roles.md`
  - 学習用のファイル役割メモ
- `docs/project-status.md`
  - AI協業用の現在地メモ

## 更新ルール

このファイルは完璧に保つ必要はありません。
大きな機能追加、運用ルール変更、次にやることが変わったときだけ短く更新します。
