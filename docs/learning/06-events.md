# 06. イベント

## 概要

イベントは、クリックや入力など、ユーザー操作に反応するための仕組みです。

Recruitment Terminal では、タグボタン、RESETボタン、候補展開ボタン、テーマ切り替えボタンでイベント処理が使われています。

## なぜ必要なのか

公開求人ツールは、ユーザーが操作して初めて意味があります。

タグをクリックしても何も起きなければ、候補は変わりません。

Reactでは `onClick` のようなイベントをJSXに書き、クリックされたときに実行する関数を指定します。

## このプロジェクトではどこで使われているか

対象ファイル:

- `src/components/TagGroup.tsx`
- `src/components/SelectedTags.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/OperatorSdModel.tsx`

対象コンポーネント:

- `TagGroup`
- `SelectedTags`
- `CandidateCard`
- `ThemeToggle`
- `OperatorSdModel`

実際の役割:

`TagGroup` では、タグボタンの `onClick` で `onToggleTag(tag)` を呼びます。

`SelectedTags` では、選択済みタグをクリックすると `onRemoveTag(tag)` を呼び、RESETボタンでは `onClear()` を呼びます。

`CombinationCandidates` では、候補カードの「ほか〜件を表示」ボタンで開閉状態を切り替えます。

`OperatorSdModel` では、動画読み込み失敗時の `onError` で fallback 表示に切り替えます。

## 処理の流れ

```text
画面
↓
タグボタンをクリック
↓
TagGroup の onClick が動く
↓
onToggleTag(tag) が呼ばれる
↓
RecruitmentApp の toggleTag が動く
↓
selectedTags が更新される
↓
候補一覧が更新される
```

## 学べること

- イベントは「ユーザー操作をReactに伝える入口」
- 子コンポーネントは、親から受け取った関数をイベントで呼ぶことが多い
- イベント処理の中でStateを更新すると画面が変わる
- `onError` のように、クリック以外のイベントもある

このプロジェクトでは、`TagGroup` のタグクリックから `RecruitmentApp` のState更新までを追うと、Reactの基本的なイベントの流れが分かります。

## 関連ファイル

- `src/components/TagGroup.tsx`
- `src/components/SelectedTags.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/OperatorSdModel.tsx`

## 次に読む教材

次は `07-list-rendering.md` を読むと、タグや候補カードがどのように一覧表示されているか理解しやすいです。
