# 08. 条件分岐による表示

## 概要

条件分岐による表示とは、状態やデータに応じて表示する内容を変えることです。

Recruitment Terminal では、タグ未選択、候補なし、候補あり、展開中、SD動画なしなど、さまざまな状態に応じて表示を変えています。

## なぜ必要なのか

検索ツールでは、いつも同じ画面を出せばよいわけではありません。

たとえば、タグを何も選んでいないときに候補カードを表示すると、ユーザーは何を見ればよいか分かりません。

そのため、このプロジェクトでは状態ごとに表示を切り替えています。

## このプロジェクトではどこで使われているか

対象ファイル:

- `src/components/SelectedTags.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/TagGroup.tsx`
- `src/components/OperatorSdModel.tsx`
- `src/app/operators/[id]/page.tsx`

対象コンポーネント:

- `SelectedTags`
- `CombinationCandidates`
- `CandidateCard`
- `TagGroup`
- `OperatorSdModel`
- `OperatorDetailPage`

実際の役割:

`SelectedTags` は、選択中タグが0件なら「未選択です。」を表示し、タグがあれば選択済みタグボタンを表示します。

`CombinationCandidates` は、タグ未選択、候補なし、候補ありで表示を分けています。

`CandidateCard` は、折りたたみ中なら一部だけ表示し、展開中なら全件表示します。

`OperatorSdModel` は、動画URLがない場合や読み込み失敗時に `No SD Data` を表示します。

詳細ページでは、特性、素質、スキルがある場合だけ該当セクションを表示しています。

## 処理の流れ

```text
selectedTags
↓
length が 0 か確認
↓
0件なら案内文
↓
1件以上なら候補計算結果を表示
↓
candidates が 0件なら候補なしメッセージ
↓
候補があれば CandidateCard を表示
```

## 学べること

- ReactではJSXの中で条件分岐を書ける
- 状態に応じて表示を変えると、ユーザーに分かりやすい画面になる
- 「何もない状態」もUIとして設計する必要がある
- 条件分岐は、検索ツールの使いやすさに直結する

このプロジェクトでは、`CombinationCandidates.tsx` を読むと条件分岐の重要性が分かりやすいです。

## 関連ファイル

- `src/components/SelectedTags.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/TagGroup.tsx`
- `src/components/OperatorSdModel.tsx`
- `src/app/operators/[id]/page.tsx`

## 次に読む教材

次は `09-hooks.md` を読むと、状態や副作用をReactでどう扱っているか理解しやすいです。
