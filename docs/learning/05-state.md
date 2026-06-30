# 05. State

## 概要

Stateは、ユーザー操作などで変化する値をReactが覚えておく仕組みです。

Recruitment Terminal では、選択中タグや候補カードの展開状態、テーマ、SD動画の読み込み失敗状態などがStateとして扱われています。

## なぜ必要なのか

公開求人ツールでは、ユーザーが操作するたびに画面が変わります。

- タグを選ぶ
- タグを解除する
- RESETする
- 候補カードを展開する
- テーマを切り替える

これらは固定データではありません。現在の画面状態として覚えておく必要があります。

Reactでは `useState` を使って、こうした変化する値を管理します。

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

`RecruitmentApp` の `selectedTags` は、現在選ばれているタグを表します。

`CombinationCandidates` の `expandedCandidateIds` は、どの候補カードが開いているかを表します。

`ThemeToggle` の `theme` は、ライトテーマかダークテーマかを表します。

`OperatorSdModel` の `failedVideoUrl` は、SD動画の読み込みに失敗したURLを覚えるために使われています。

## 処理の流れ

```text
画面にタグボタンが表示される
↓
ユーザーがタグをクリック
↓
toggleTag が呼ばれる
↓
setSelectedTags で selectedTags が変わる
↓
ReactがRecruitmentAppを再描画する
↓
SelectedTags と CombinationCandidates の表示が更新される
```

## 学べること

- Stateは「画面が覚えておく現在の値」
- Stateを直接書き換えず、更新用関数を使う
- Stateが変わると、そのStateを使う画面が更新される
- Stateは必要な場所に置く

このプロジェクトでは、選択中タグを `RecruitmentApp` に置いています。なぜなら、タグ選択欄、選択中タグ表示、候補一覧のすべてが `selectedTags` を必要とするからです。

## 関連ファイル

- `src/components/RecruitmentApp.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/OperatorSdModel.tsx`

## 次に読む教材

次は `06-events.md` を読むと、Stateがどの操作で更新されるか理解しやすいです。
