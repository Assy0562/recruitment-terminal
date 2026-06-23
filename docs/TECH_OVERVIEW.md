# 技術概要メモ

このドキュメントは、Recruitment Terminal で使っている主要技術を学習用に整理したものです。

単なる用語集ではなく、次の観点を重視します。

- 何のために使うのか
- どんな問題を解決するのか
- このプロジェクトで何を学べるのか
- このプロジェクト内でどこに使われているのか

## まず全体像

Recruitment Terminal は、公開求人タグを選ぶと候補オペレーターを表示し、詳細ページで追加情報を確認できるWebアプリです。

このアプリは、ざっくり分けると次の技術でできています。

```text
Next.js
  ページ構成、ルーティング、ビルド、公開しやすいアプリ構成を担当

React
  ボタン、カード、タグ一覧などの画面部品を作る

TypeScript
  データの形を決めて、ミスに気づきやすくする

Tailwind CSS
  classNameで素早くUIを整える

JSONデータ
  DBなしでオペレーターやタグ情報を管理する

Git / GitHub
  変更履歴を残し、GitHubに保存する

Vercel
  GitHubと連携してWebアプリを公開する
```

## Next.js

### 何のために使うのか

Next.jsは、Reactを使ってWebアプリを作るためのフレームワークです。

Reactだけでも画面は作れますが、実際のアプリでは次のようなことも必要になります。

- ページごとのURLを作る
- トップページと詳細ページを分ける
- 画像やCSSを扱う
- 本番公開用にビルドする
- Vercelなどへ公開しやすくする

Next.jsは、これらをまとめて面倒見てくれます。

### どんな問題を解決するのか

Next.jsがない場合、Reactアプリで次のような仕組みを自分で用意する必要があります。

- URLとページの対応
- ビルド設定
- 画像最適化
- メタデータ設定
- 公開時の構成

小さいアプリなら何とかなりますが、ページが増えると管理が大変になります。

Next.jsを使うと、ファイルを置く場所でページ構成が分かりやすくなります。

### このプロジェクトで学べること

このプロジェクトでは、Next.jsを通して次のことを学べます。

- `src/app/page.tsx` がトップページになること
- `src/app/operators/[id]/page.tsx` が動的な詳細ページになること
- `src/app/layout.tsx` が全ページ共通の土台になること
- `next/image` や `next/link` を使ったNext.jsらしい実装
- `npm run build` で本番用にビルドする流れ

### このプロジェクト内での実例

- `src/app/page.tsx`
  - トップページ
- `src/app/operators/[id]/page.tsx`
  - オペレーター詳細ページ
- `src/app/layout.tsx`
  - 全ページ共通レイアウト
- `src/components/OperatorCard.tsx`
  - `next/link` を使って詳細ページへ移動
- `src/app/operators/[id]/page.tsx`
  - `next/image` を使って立ち絵やアイコンを表示

## React

### 何のために使うのか

Reactは、画面を部品に分けて作るためのライブラリです。

このプロジェクトでは、画面を次のような部品に分けています。

- ヘッダー
- タグ選択エリア
- 選択中タグ表示
- 求人候補カード
- オペレーターカード
- SDモデル表示
- テーマ切り替えボタン

それぞれをコンポーネントとして作ることで、画面全体を整理しやすくしています。

### どんな問題を解決するのか

Reactがない場合、HTMLを直接操作しながら画面を更新することになります。

例えば、タグを選んだときに次の処理を自分で管理する必要があります。

- 選択状態を覚える
- ボタンの見た目を変える
- 候補一覧を再計算する
- 表示を更新する

Reactを使うと、状態が変わったときに画面を自動で更新しやすくなります。

### Reactが無い場合との比較

Reactが無い場合:

```text
タグクリック
  -> DOMを探す
  -> classを変更する
  -> 候補一覧を手動で消す
  -> 新しい候補HTMLを作る
  -> 画面に差し込む
```

Reactがある場合:

```text
タグクリック
  -> selectedTagsを更新する
  -> Reactが画面を再描画する
```

この違いは、アプリが大きくなるほど効いてきます。

### このプロジェクトで学べること

- コンポーネント分割
- `useState` による状態管理
- `useEffect` によるブラウザ機能との連携
- `useMemo` による計算結果の再利用
- propsで親から子へデータを渡す流れ

### このプロジェクト内での実例

- `src/components/RecruitmentApp.tsx`
  - `selectedTags` を state として管理
  - タグ選択、解除、保存を担当
- `src/components/TagSelector.tsx`
  - タグ選択UI
- `src/components/SelectedTags.tsx`
  - 選択中タグの表示
- `src/components/CombinationCandidates.tsx`
  - 求人候補の表示
- `src/components/ThemeToggle.tsx`
  - ライト/ダーク切り替え

## TypeScript

### 何のために使うのか

TypeScriptは、JavaScriptに「型」を追加した言語です。

型とは、データの形をあらかじめ決める仕組みです。

例えば、このプロジェクトではオペレーターのデータに次のような情報があります。

- id
- name
- rarity
- profession
- tags
- skills

TypeScriptを使うことで、「このデータには何が入っているべきか」をコード上で表せます。

### どんな問題を解決するのか

TypeScriptがない場合、データ名の打ち間違いや、存在しない項目へのアクセスに気づきにくくなります。

例:

```ts
operator.rarity
operator.profession
```

もし `rarity` を `rarety` と打ち間違えても、JavaScriptだけだと実行するまで気づきにくいです。

TypeScriptなら、エディタやビルド時に気づけます。

### TypeScriptが無い場合との比較

TypeScriptが無い場合:

```text
実行して初めてエラーに気づくことがある
データ構造が頭の中だけになりやすい
```

TypeScriptがある場合:

```text
コードを書く段階でミスに気づきやすい
データ構造が型として残る
補完が効きやすい
```

### このプロジェクトで学べること

- JSONデータに型を付けて扱う方法
- コンポーネントのpropsに型を付ける方法
- `Operator` や `TagCategory` のような独自型の作り方
- 型を使って安全にデータを表示する考え方

### このプロジェクト内での実例

- `src/types/operator.ts`
  - `Operator`, `TagCategory`, `OperatorDetailItem` を定義
- `src/lib/recruit.ts`
  - `Operator[]` を受け取って候補を計算
- `src/app/operators/[id]/page.tsx`
  - `RangePattern` など詳細ページ用の型を定義
- `src/components/OperatorCard.tsx`
  - オペレーター情報をpropsとして受け取る

## Tailwind CSS

### 何のために使うのか

Tailwind CSSは、classNameに短いクラスを書いてデザインを作るCSSフレームワークです。

通常のCSSでは、先にクラス名を考えてCSSファイルにスタイルを書きます。

Tailwindでは、次のようにHTML/JSX側で見た目を組み立てます。

```tsx
<div className="border bg-zinc-900 text-zinc-50">
```

### どんな問題を解決するのか

CSSを全部自分で書く場合、次のような問題が起きやすくなります。

- クラス名を考えるのが大変
- 似たようなCSSが増える
- どこで使われているCSSか分かりにくい
- 小さなUI調整に時間がかかる

Tailwindを使うと、コンポーネントを見ながらその場で見た目を調整できます。

### このプロジェクトで学べること

- ダークテーマとライトテーマのスタイル分け
- レスポンシブデザイン
- 端末風UIの細い罫線や背景表現
- コンポーネント単位で見た目を調整する方法
- 共通クラスとユーティリティクラスの使い分け

### このプロジェクト内での実例

- `src/app/globals.css`
  - 全体背景、テーマ、共通クラス
- `src/components/OperatorCard.tsx`
  - オペレーターカードの見た目
- `src/components/TagGroup.tsx`
  - タグボタンの見た目
- `src/app/operators/[id]/page.tsx`
  - 詳細ページの2カラムレイアウト
- `src/components/OperatorSdModel.tsx`
  - SDカードと戦闘情報ドックの見た目

## App Router

### 何のために使うのか

App Routerは、Next.jsのページ構成を作る仕組みです。

`src/app` 配下のフォルダやファイル構成によって、URLが決まります。

```text
src/app/page.tsx
  -> /

src/app/operators/[id]/page.tsx
  -> /operators/任意のid
```

### どんな問題を解決するのか

App Routerがない場合、どのURLでどの画面を表示するかを別の設定で管理する必要があります。

App Routerでは、ファイル構成を見るだけでページ構成が分かります。

### このプロジェクトで学べること

- ファイルベースルーティング
- 動的ルート `[id]`
- 共通レイアウト `layout.tsx`
- ページごとのmetadata
- 詳細ページの静的生成

### このプロジェクト内での実例

- `src/app/page.tsx`
  - トップページ
- `src/app/layout.tsx`
  - 全体レイアウト
- `src/app/operators/[id]/page.tsx`
  - 動的詳細ページ
- `generateStaticParams()`
  - 全オペレーター詳細ページの生成対象をNext.jsに伝える
- `generateMetadata()`
  - ページタイトルを作る

## Server Component

### 何のために使うのか

Server Componentは、サーバー側で処理されるReactコンポーネントです。

Next.js App Routerでは、特に指定しなければ基本的にServer Componentになります。

### どんな問題を解決するのか

すべてをブラウザ側で動かすと、JavaScriptの量が増えたり、初期表示が重くなったりします。

Server Componentを使うと、ブラウザに送るJavaScriptを減らしやすくなります。

### このプロジェクトで学べること

- ページの土台はServer Componentで作る
- ブラウザ操作が必要な部分だけClient Componentにする
- データ読み込みとページ構成をサーバー側で行う考え方

### このプロジェクト内での実例

- `src/app/layout.tsx`
  - 全体レイアウト
- `src/app/page.tsx`
  - トップページ
- `src/app/operators/[id]/page.tsx`
  - オペレーター詳細ページ

これらはファイル先頭に `"use client"` がないため、Server Componentとして扱われます。

## Client Component

### 何のために使うのか

Client Componentは、ブラウザ側で動くReactコンポーネントです。

クリック、state、localStorage、sessionStorage、動画読み込み状態など、ブラウザ上で変化する処理に使います。

ファイルの先頭に次のように書きます。

```tsx
"use client";
```

### どんな問題を解決するのか

Server Componentだけでは、ブラウザ上の操作を扱えません。

例えば次のような処理にはClient Componentが必要です。

- タグをクリックして選択状態を変える
- テーマ切り替えボタンを押す
- sessionStorageに選択タグを保存する
- SD動画の読み込みエラーを検知する

### このプロジェクトで学べること

- Server ComponentとClient Componentの分け方
- `useState`, `useEffect`, `useMemo` の使いどころ
- ブラウザAPIとの連携
- 親から子へpropsを渡す流れ

### このプロジェクト内での実例

- `src/components/RecruitmentApp.tsx`
  - タグ選択状態を管理
- `src/components/ThemeToggle.tsx`
  - テーマ切り替え
- `src/components/CombinationCandidates.tsx`
  - 候補カードの展開状態を管理
- `src/components/OperatorSdModel.tsx`
  - SD動画のURL生成と読み込み失敗時の表示

## JSONデータ管理

### 何のために使うのか

JSONデータ管理は、DBを使わずに固定データをファイルとして持つ方法です。

このプロジェクトでは、オペレーターやタグの情報をJSONで管理しています。

### どんな問題を解決するのか

最初からDBを使うと、次のような準備が必要になります。

- DB設計
- 接続設定
- 認証情報の管理
- デプロイ先でのDB準備
- データ更新用の管理画面

ポートフォリオのMVPでは、まずJSONで管理した方がシンプルです。

### このプロジェクトで学べること

- UIとデータを分ける考え方
- JSONをimportして画面に使う方法
- TypeScriptの型とJSONを組み合わせる方法
- DBなしでも検索ツールを作れること

### このプロジェクト内での実例

- `src/data/operators.json`
  - オペレーター基本情報
- `src/data/tags.json`
  - 公開求人タグ
- `src/data/operatorEnglishNames.json`
  - 英語名
- `src/data/operatorRanges.json`
  - 攻撃範囲と配置マス
- `src/components/RecruitmentApp.tsx`
  - `operators.json` と `tags.json` を読み込む
- `src/app/operators/[id]/page.tsx`
  - 詳細ページ用のJSONを読み込む

## Vercel

### 何のために使うのか

Vercelは、Next.jsアプリを公開するためのホスティングサービスです。

GitHubと連携すると、pushした内容をもとに自動でビルドして公開できます。

### どんな問題を解決するのか

自分でサーバーを用意する場合、次のような作業が必要になります。

- サーバー契約
- Node.js環境構築
- ビルド成果物の配置
- HTTPS設定
- デプロイ手順の管理

Vercelを使うと、Next.jsアプリをかなり簡単に公開できます。

### このプロジェクトで学べること

- GitHubにpushして公開する流れ
- 本番URLを持つポートフォリオの作り方
- `npm run build` が通ることの重要性
- ローカル開発と本番公開の違い

### このプロジェクト内での実例

- 公開URL: `https://recruitment-terminal.vercel.app/`
- `README.md`
  - 公開URLを記載
- `package.json`
  - buildコマンドをVercelが利用
- GitHubリポジトリ
  - pushした内容が公開元になる

## Git / GitHub

### 何のために使うのか

Gitは変更履歴を管理するための道具です。

GitHubは、そのGitリポジトリをインターネット上に保存・共有するサービスです。

### どんな問題を解決するのか

Gitがない場合、次のような問題が起きやすくなります。

- どこを変更したか分からなくなる
- 前の状態に戻しにくい
- 作業の区切りが残らない
- 公開サービスと連携しにくい

GitHubがあると、コードを安全に保存でき、Vercelとも連携できます。

### このプロジェクトで学べること

- `git status` で変更状態を見る
- `git add` で変更をステージする
- `git commit` で作業単位を保存する
- `git push` でGitHubへ反映する
- コミット単位で作業履歴を残す

### このプロジェクト内での実例

- GitHubリポジトリ: `https://github.com/Assy0562/recruitment-terminal`
- `README.md`
  - GitHub上でプロジェクト説明として表示される
- `docs/project-status.md`
  - AI協業の現在地を記録する
- `.gitignore`
  - `node_modules` や `.next` など、Gitに入れないものを指定する

## ESLint

### 何のために使うのか

ESLintは、コードの書き方やミスをチェックする道具です。

### どんな問題を解決するのか

人間が目で確認するだけだと、細かいミスを見落としやすくなります。

ESLintを使うと、一定のルールでコードをチェックできます。

### このプロジェクトで学べること

- 実装後に `npm run lint` で確認する習慣
- エラーになる前の小さな問題に気づく流れ
- チーム開発でも読みやすいコードに寄せる考え方

### このプロジェクト内での実例

- `eslint.config.mjs`
  - ESLint設定
- `package.json`
  - `npm run lint` コマンド
- `docs/project-status.md`
  - 作業終了時の確認候補として記載

## npm / node_modules

### 何のために使うのか

npmは、JavaScriptやNext.jsで使うパッケージを管理する道具です。

`node_modules` は、インストールされたパッケージ本体が入るフォルダです。

### どんな問題を解決するのか

Next.js、React、TypeScript、Tailwind CSSなどを全部自分で用意するのは大変です。

npmを使うと、必要なパッケージをまとめてインストールできます。

### このプロジェクトで学べること

- `package.json` が依存関係とコマンドを管理すること
- `package-lock.json` が正確なバージョンを記録すること
- `node_modules` は自分で編集しないこと
- `npm install` で依存パッケージを復元できること

### このプロジェクト内での実例

- `package.json`
  - 依存パッケージと実行コマンド
- `package-lock.json`
  - 依存パッケージのバージョン固定
- `node_modules/`
  - GitHubには通常上げない外部パッケージ置き場

## 技術同士の関係

このプロジェクトでは、各技術が次のようにつながっています。

```text
GitHub
  -> コードを保存する
  -> Vercelが読み取って公開する

Vercel
  -> Next.jsアプリをビルドして公開する

Next.js
  -> Reactを使ってページを作る
  -> App RouterでURLとページを対応させる

React
  -> UIをコンポーネントに分ける
  -> Client Componentで操作状態を扱う

TypeScript
  -> JSONデータやpropsの形を安全に扱う

Tailwind CSS
  -> UIの見た目を素早く整える

JSONデータ
  -> DBなしでオペレーターやタグ情報を管理する
```

## このプロジェクトで特に学びやすい順番

初心者が読むなら、次の順番がおすすめです。

1. `README.md`
   - アプリ全体の目的を知る
2. `docs/file-roles.md`
   - ファイルごとの役割を知る
3. `src/app/page.tsx`
   - トップページの入り口を見る
4. `src/components/RecruitmentApp.tsx`
   - Reactの状態管理を見る
5. `src/lib/recruit.ts`
   - タグ検索ロジックを見る
6. `src/app/operators/[id]/page.tsx`
   - Next.jsの動的ページを見る
7. `src/types/operator.ts`
   - TypeScriptの型を見る
8. `src/app/globals.css`
   - Tailwind CSSと共通スタイルを見る

## まとめ

このプロジェクトは、モダンなWebアプリ開発の基本を小さめの範囲で学べる構成です。

特に重要なのは、次の考え方です。

- Next.jsは、Reactアプリをページ単位で作りやすくする
- Reactは、UIを部品に分けて状態に応じて表示を変える
- TypeScriptは、データの形を守ってミスに気づきやすくする
- Tailwind CSSは、見た目の調整を速くする
- JSON管理は、DBなしでMVPを作るための現実的な方法
- Git / GitHub / Vercelは、作ったものを安全に保存して公開する流れを作る

「なぜ必要か」を意識して読むと、単にコードを写すだけではなく、Webアプリ全体の作り方が理解しやすくなります。