# 07. リスト表示

## 概要

リスト表示は、配列データから複数の画面要素を作ることです。

Recruitment Terminal では、タグ一覧、候補パターン一覧、オペレーターカード一覧、素質やスキル一覧で使われています。

## なぜ必要なのか

このアプリのデータは、ほとんどが配列です。

- タグカテゴリ一覧
- 各カテゴリのタグ一覧
- 候補パターン一覧
- 候補内のオペレーター一覧
- 詳細ページの素質一覧
- 詳細ページのスキル一覧

これらを1つずつ手書きすると、データが増えるたびに画面コードも増えてしまいます。

Reactでは `map()` を使って、配列から画面を作ります。

## このプロジェクトではどこで使われているか

対象ファイル:

- `src/components/TagSelector.tsx`
- `src/components/TagGroup.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/OperatorCard.tsx`
- `src/app/operators/[id]/page.tsx`

対象コンポーネント:

- `TagSelector`
- `TagGroup`
- `CombinationCandidates`
- `CandidateCard`
- `OperatorCard`
- `OperatorDetailPage`

実際の役割:

`TagSelector` は `tagCategories.map()` でカテゴリごとに `TagGroup` を作ります。

`TagGroup` は `tags.map()` でタグボタンを作ります。

`CombinationCandidates` は `candidates.map()` で候補カードを作ります。

`CandidateCard` は `visibleOperators.map()` で `OperatorCard` を並べます。

詳細ページでは、`operator.talents.map()` と `operator.skills.map()` で詳細項目を表示しています。

## 処理の流れ

```text
tags.json
↓
tagCategories 配列
↓
TagSelector
↓
tagCategories.map()
↓
TagGroup がカテゴリ数ぶん表示される
↓
TagGroup 内で tags.map()
↓
タグボタンがタグ数ぶん表示される
```

## 学べること

- 配列データは `map()` で画面に変換できる
- Reactのリスト表示では `key` が必要
- `key` はReactがどの要素がどれかを見分けるために使う
- データが増えても、表示コードは大きく増えない

このプロジェクトでは、`TagGroup.tsx` と `CombinationCandidates.tsx` がリスト表示の練習に向いています。

## 関連ファイル

- `src/components/TagSelector.tsx`
- `src/components/TagGroup.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/OperatorCard.tsx`
- `src/app/operators/[id]/page.tsx`

## 次に読む教材

次は `08-conditional-rendering.md` を読むと、一覧の中身を条件でどう切り替えているか理解しやすいです。
