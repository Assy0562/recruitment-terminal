# 02. JSX

## 概要

JSXは、JavaScriptやTypeScriptの中にHTMLに近い見た目で画面を書くための記法です。

Recruitment Terminal では、各コンポーネントの `return (...)` の中にJSXが書かれています。

## なぜ必要なのか

Reactでは、状態やデータに応じて画面を作ります。

たとえば `SelectedTags` では、選択中タグが空なら案内文を表示し、タグがあるならタグボタンを表示します。

JSXがあることで、次のようなことを同じ場所で読みやすく書けます。

- HTMLのような画面構造
- `{selectedTags.length}` のような変数表示
- 条件による表示切り替え
- 配列からの一覧表示
- `onClick` のようなイベント指定

## このプロジェクトではどこで使われているか

対象ファイル:

- `src/app/page.tsx`
- `src/components/SelectedTags.tsx`
- `src/components/TagGroup.tsx`
- `src/components/OperatorCard.tsx`
- `src/app/operators/[id]/page.tsx`

対象コンポーネント:

- `Home`
- `SelectedTags`
- `TagGroup`
- `OperatorCard`
- `OperatorDetailPage`

実際の役割:

`src/app/page.tsx` では、`Header` と `RecruitmentApp` を並べています。

`TagGroup` では、タグ配列を `map()` でボタンに変換しています。

`OperatorCard` では、オペレーター名、レアリティ、画像、タグをJSXでカードとして組み立てています。

## 処理の流れ

```text
データ
↓
JSX内の {} に埋め込まれる
↓
コンポーネントが画面構造を返す
↓
Reactがブラウザに表示する
↓
Stateやpropsが変わる
↓
JSXが新しい内容で再評価される
```

## 学べること

- JSXはHTMLそのものではなく、Reactが画面を作るための書き方
- `{}` の中ではJavaScriptの値を表示できる
- `className` でCSSクラスを指定する
- `onClick={() => ...}` のようにイベント処理を書ける
- 条件分岐や `map()` と組み合わせると、データから画面を作れる

このプロジェクトでは、`TagGroup.tsx` のタグボタン一覧がJSXの学習に向いています。

## 関連ファイル

- `src/app/page.tsx`
- `src/components/TagGroup.tsx`
- `src/components/SelectedTags.tsx`
- `src/components/OperatorCard.tsx`

## 次に読む教材

次は `03-components.md` を読むと、JSXをどの単位で分けているか理解しやすいです。
