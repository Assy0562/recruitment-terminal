# 04. Props

## 概要

propsは、親コンポーネントから子コンポーネントへ渡す情報です。

Recruitment Terminal では、選択中タグ、タグ一覧、候補一覧、クリック時の関数などがpropsとして渡されています。

## なぜ必要なのか

コンポーネントを分けると、それぞれの部品が必要な情報を受け取る仕組みが必要になります。

たとえば `TagGroup` は、どのタグを表示するかを自分では知りません。親から `tags` として受け取ります。

また、タグをクリックしたときに何をするかも、`TagGroup` 自身では決めません。親から `onToggleTag` を受け取り、それを呼び出します。

## このプロジェクトではどこで使われているか

対象ファイル:

- `src/components/RecruitmentApp.tsx`
- `src/components/TagSelector.tsx`
- `src/components/TagGroup.tsx`
- `src/components/SelectedTags.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/OperatorCard.tsx`

対象コンポーネント:

- `TagSelector`
- `TagGroup`
- `SelectedTags`
- `CombinationCandidates`
- `OperatorCard`

実際の役割:

`RecruitmentApp` は `TagSelector` に次のような情報を渡しています。

- `tagCategories`
- `selectedTags`
- `maxSelectedTags`
- `onToggleTag`

`TagSelector` はカテゴリごとに `TagGroup` を作り、さらに必要なpropsを渡します。

`OperatorCard` は `operator` を受け取り、その1人分の画像、名前、レアリティ、タグを表示します。

## 処理の流れ

```text
RecruitmentApp
↓ props
TagSelector
↓ props
TagGroup
↓
タグボタンを表示
↓
クリックされたら onToggleTag(tag) を呼ぶ
↓
RecruitmentApp の State が更新される
```

## 学べること

- propsは親から子へ渡す
- 子はpropsを使って表示する
- 子から親のStateを直接変更するのではなく、親から渡された関数を呼ぶ
- TypeScriptの型を書くと、どんなpropsが必要か分かりやすい

このプロジェクトでは、`TagGroupProps` や `SelectedTagsProps` を見ると、propsの形がはっきり分かります。

## 関連ファイル

- `src/components/RecruitmentApp.tsx`
- `src/components/TagSelector.tsx`
- `src/components/TagGroup.tsx`
- `src/components/SelectedTags.tsx`
- `src/components/OperatorCard.tsx`
- `src/types/operator.ts`

## 次に読む教材

次は `05-state.md` を読むと、propsで渡される元のデータがどこで管理されているか理解しやすいです。
