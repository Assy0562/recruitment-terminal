# 03. コンポーネント

## 概要

コンポーネントは、画面を作るための部品です。

Recruitment Terminal では、トップページ全体を1つの大きなファイルに書かず、役割ごとに分けています。

## なぜ必要なのか

公開求人ツールには、いくつもの役割があります。

- ヘッダー
- タグ選択
- 選択中タグ
- 求人候補
- オペレーターカード
- テーマ切り替え
- SDモデル表示

これを1ファイルに全部書くと、どこが何をしているか分かりにくくなります。

コンポーネントに分けると、「タグ一覧は `TagSelector`」「候補表示は `CombinationCandidates`」のように担当が明確になります。

## このプロジェクトではどこで使われているか

対象ファイル:

- `src/app/page.tsx`
- `src/components/Header.tsx`
- `src/components/RecruitmentApp.tsx`
- `src/components/TagSelector.tsx`
- `src/components/TagGroup.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/OperatorCard.tsx`

対象コンポーネント:

- `Home`
- `Header`
- `RecruitmentApp`
- `TagSelector`
- `TagGroup`
- `CombinationCandidates`
- `OperatorCard`

実際の役割:

`Home` は `Header` と `RecruitmentApp` を置くだけです。

`RecruitmentApp` は検索機能全体の親です。

`TagSelector` はカテゴリ一覧を受け取り、カテゴリごとに `TagGroup` を表示します。

`CombinationCandidates` は候補パターンを表示し、内部で `OperatorCard` を並べます。

## 処理の流れ

```text
画面
↓
Home
↓
Header
RecruitmentApp
↓
RecruitmentApp が状態とデータを管理
↓
TagSelector / SelectedTags / CombinationCandidates に分配
↓
各コンポーネントが自分の担当部分だけ表示
```

## 学べること

- コンポーネントは「画面の担当範囲」を分けるために使う
- 親コンポーネントは状態やデータを持つことが多い
- 子コンポーネントはpropsを受け取って表示することが多い
- 小さく分けると、修正したい場所を探しやすい

このプロジェクトでは、`RecruitmentApp` から下を読むと、コンポーネント分割の意味が分かりやすいです。

## 関連ファイル

- `src/app/page.tsx`
- `src/components/RecruitmentApp.tsx`
- `src/components/TagSelector.tsx`
- `src/components/TagGroup.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/OperatorCard.tsx`

## 次に読む教材

次は `04-props.md` を読むと、コンポーネント同士がどう情報を渡しているか理解しやすいです。
