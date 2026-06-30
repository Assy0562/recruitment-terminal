# 01. Reactの基本

## 概要

Reactは、画面を小さな部品に分けて作るためのライブラリです。

Recruitment Terminal では、タグ選択欄、選択中タグ、候補一覧、オペレーターカード、テーマ切り替えなどを別々のコンポーネントとして作っています。

## なぜ必要なのか

このアプリは、画面の一部だけが頻繁に変わります。

たとえば、タグを1つ選んだだけで、次の表示が変わります。

- 選択中タグ
- 選択数
- 求人候補
- 候補カード内のオペレーター

Reactがない場合、どのHTMLを書き換えるかを自分で細かく管理する必要があります。

Reactでは、`selectedTags` のような状態を更新すると、その状態を使っている画面が自動的に再描画されます。

## このプロジェクトではどこで使われているか

対象ファイル:

- `src/components/RecruitmentApp.tsx`
- `src/components/TagSelector.tsx`
- `src/components/SelectedTags.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/OperatorCard.tsx`

対象コンポーネント:

- `RecruitmentApp`
- `TagSelector`
- `SelectedTags`
- `CombinationCandidates`
- `OperatorCard`

実際の役割:

`RecruitmentApp` はトップページの中心です。選択中タグを State として持ち、候補計算を行い、子コンポーネントに情報を渡します。

`TagSelector` はタグ一覧を表示します。`CombinationCandidates` は計算済みの候補を表示します。

## 処理の流れ

```text
画面
↓
RecruitmentApp が表示される
↓
selectedTags State を持つ
↓
TagSelector / SelectedTags / CombinationCandidates に props を渡す
↓
タグボタンをクリック
↓
selectedTags が変わる
↓
画面が新しい状態で描画される
```

## 学べること

- Reactでは「画面 = データをもとに作られる結果」と考える
- 画面を直接書き換えるのではなく、Stateを変える
- 大きな画面は小さなコンポーネントに分ける
- 親コンポーネントが状態を持ち、子にpropsとして渡す構成が多い

このプロジェクトでは、`RecruitmentApp` が親、`TagSelector` や `SelectedTags` が子という関係を見ると分かりやすいです。

## 関連ファイル

- `src/components/RecruitmentApp.tsx`
- `src/components/TagSelector.tsx`
- `src/components/SelectedTags.tsx`
- `src/components/CombinationCandidates.tsx`

## 次に読む教材

次は `02-jsx.md` を読むと、Reactで画面をどう書いているか理解しやすいです。
