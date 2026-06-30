# 09. Hooks

## 概要

Hooksは、Reactの関数コンポーネントでStateや副作用などを扱うための仕組みです。

Recruitment Terminal では、`useState`、`useEffect`、`useMemo` が使われています。

## なぜ必要なのか

Reactのコンポーネントは、ただ表示するだけでは足りないことがあります。

- 選択中タグを覚える
- sessionStorageに保存する
- 画面幅に応じて表示件数を変える
- テーマをlocalStorageに保存する
- SD動画URLを計算する

Hooksを使うことで、こうした処理を関数コンポーネントの中で扱えます。

## このプロジェクトではどこで使われているか

対象ファイル:

- `src/components/RecruitmentApp.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/OperatorSdModel.tsx`

対象コンポーネント:

- `RecruitmentApp`
- `CombinationCandidates`
- `ThemeToggle`
- `OperatorSdModel`

実際の役割:

`RecruitmentApp` では、`useState` で `selectedTags` と `hasRestoredSelection` を管理しています。`useEffect` で sessionStorage から復元し、別の `useEffect` で保存しています。`useMemo` で候補計算を必要なときだけ実行しています。

`CombinationCandidates` では、`useState` で展開中候補IDを管理し、`useEffect` で sessionStorage に保存しています。また、`usePreviewOperatorLimit` という独自Hookで画面幅に応じた初期表示件数を管理しています。

`ThemeToggle` では、`theme` Stateを持ち、`useEffect` でHTMLのclassとlocalStorageに反映しています。

`OperatorSdModel` では、`useMemo` でSD動画URLを作り、`useState` で読み込み失敗URLを記録しています。

## 処理の流れ

```text
画面を開く
↓
RecruitmentApp が表示される
↓
useEffect で sessionStorage から selectedTags を復元
↓
selectedTags が State に入る
↓
useMemo で候補を計算
↓
CombinationCandidates に candidates を渡す
↓
画面幅が変わる
↓
usePreviewOperatorLimit の resize 監視が動く
↓
折りたたみ時の表示件数が更新される
```

## 学べること

- `useState` は変化する値を管理する
- `useEffect` は画面表示後にブラウザAPIと同期する処理に使う
- `useMemo` は計算結果を必要なときだけ作り直すために使う
- 独自Hookを作ると、画面幅の監視のような処理を名前付きで整理できる
- Hooksは「Reactの外側」とつながる処理にもよく使われる

このプロジェクトでは、`RecruitmentApp.tsx` がHooksの基本、`CombinationCandidates.tsx` が少し応用の例です。

## 関連ファイル

- `src/components/RecruitmentApp.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/OperatorSdModel.tsx`
- `src/lib/recruit.ts`

## 次に読む教材

次は `docs/file-roles.md` に戻って、実際のファイルを読みながら `RecruitmentApp.tsx`、`CombinationCandidates.tsx`、`OperatorCard.tsx` の順に追うと理解しやすいです。
