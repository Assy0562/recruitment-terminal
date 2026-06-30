# 00. プロジェクト全体像

## 概要

Recruitment Terminal は、公開求人タグを選ぶとスカウト候補のオペレーターを表示する Next.js / React アプリです。

この教材では、一般的な React 解説ではなく、このアプリの実装を例にして「なぜこのコードがあるのか」を追います。

このプロジェクトでは、React は画面を部品に分け、ユーザー操作に応じて表示を更新するために使われています。

## なぜ必要なのか

公開求人ツールでは、ユーザーがタグをクリックするたびに画面が変わります。

- 選択中タグを更新する
- 候補組み合わせを再計算する
- 候補カードを表示し直す
- 詳細ページへ移動する
- 戻ってきたときに選択状態を復元する

これを普通のHTMLだけで書くと、画面更新や状態管理が散らばりやすくなります。

Reactを使うことで、画面を「部品」と「状態」の組み合わせとして整理できます。

## このプロジェクトではどこで使われているか

対象ファイル:

- `src/app/page.tsx`
- `src/components/RecruitmentApp.tsx`
- `src/components/TagSelector.tsx`
- `src/components/TagGroup.tsx`
- `src/components/SelectedTags.tsx`
- `src/components/CombinationCandidates.tsx`
- `src/components/OperatorCard.tsx`
- `src/app/operators/[id]/page.tsx`

対象コンポーネント:

- `Home`
- `RecruitmentApp`
- `TagSelector`
- `TagGroup`
- `SelectedTags`
- `CombinationCandidates`
- `OperatorCard`
- `OperatorDetailPage`

実際の役割:

`src/app/page.tsx` はトップページの入口です。ここでは `Header` と `RecruitmentApp` を表示するだけにして、実際の求人検索処理は `RecruitmentApp` に任せています。

`RecruitmentApp` は、選択中タグの状態を持ち、候補計算を行い、子コンポーネントへ必要な情報を渡します。

## 処理の流れ

```text
トップページを開く
↓
src/app/page.tsx が Header と RecruitmentApp を表示
↓
RecruitmentApp が operators.json / tags.json を読み込む
↓
selectedTags という State を持つ
↓
TagSelector にタグ一覧を渡す
↓
ユーザーがタグをクリック
↓
selectedTags が更新される
↓
getTagCombinationCandidates で候補を再計算
↓
CombinationCandidates が候補カードを表示
↓
OperatorCard をクリックすると詳細ページへ移動
```

## 学べること

- Reactでは画面をコンポーネントに分けて考える
- ユーザー操作で変わる値は State として持つ
- State が変わると、関連する表示が更新される
- JSONデータ、計算ロジック、画面表示を分けると理解しやすい
- Next.js App Router では `src/app/page.tsx` や `src/app/operators/[id]/page.tsx` がURLに対応する

## 関連ファイル

- `README.md`
- `docs/project-status.md`
- `docs/file-roles.md`
- `src/app/page.tsx`
- `src/components/RecruitmentApp.tsx`
- `src/lib/recruit.ts`

## 次に読む教材

次は `01-react-basics.md` を読むと、Reactがこのプロジェクトで何を担当しているか理解しやすいです。
