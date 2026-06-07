# Recruitment Terminal

アークナイツの公開求人タグをもとに、有効なタグ組み合わせと候補オペレーターを確認できる検索ツールです。

就活用ポートフォリオとして、単なる一覧サイトではなく、タグ選択から候補確認までの体験とUIの見やすさを重視して制作しています。
ローカルJSONのデータを使い、タグ選択からスカウト可能なオペレーター候補を表示します。

## 公開URL

https://recruitment-terminal.vercel.app/

## リポジトリ

https://github.com/Assy0562/recruitment-terminal

## 主な機能

- 公開求人タグの選択
- 選択タグから有効なタグ組み合わせ候補を表示
- 組み合わせごとのスカウト可能オペレーター表示
- オペレーターカードから詳細ページへ遷移
- オペレーター画像、職業、配置、特性、素質、スキル情報の表示
- ダーク / ライトテーマ切り替え
- スマートフォンでも使いやすいレスポンシブUI

## UIコンセプト

アークナイツ本家のUIに見られる、SF・ミリタリー・工業製品のような端末感を参考にしています。

- 黒、グレー、白を基調にした戦術端末風UI
- 水色を選択状態や候補数などの機能色として使用
- 強いネオンや過度な装飾を避けたフラットなパネル表現
- 公開求人画面を意識したタグボタンと操作パネル
- オペレーター詳細画面ではキャラクター画像を主役にした2カラム構成

## 使用技術

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- ローカルJSONデータ管理
- Vercel

## データ管理

最初のMVPではDBやログイン機能は使わず、以下のようなローカルJSONで管理しています。

- `src/data/operators.json`
- `src/data/tags.json`

この構成にすることで、初心者でもデータの追加・修正がしやすく、アプリ本体のロジックとデータを分けて保守できます。

## 開発環境での起動

```bash
npm install
npm run dev
```

起動後、以下のURLを開きます。

```text
http://localhost:3000
```

## ビルド

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## ディレクトリ構成

```text
src/
  app/
    page.tsx
    operators/[id]/page.tsx
    globals.css
  components/
    Header.tsx
    RecruitmentApp.tsx
    TagSelector.tsx
    TagGroup.tsx
    SelectedTags.tsx
    CombinationCandidates.tsx
    OperatorCard.tsx
    ThemeToggle.tsx
  data/
    operators.json
    tags.json
  lib/
    recruit.ts
  types/
    operator.ts
```

## 工夫した点

- 選択タグと候補表示を分け、現在の検索状態が分かりやすい構成にした
- 全選択タグに完全一致する結果だけでなく、選択タグ内で有効な組み合わせ候補を表示できるようにした
- オペレーターカード全体をクリック可能にし、詳細ページへ自然に遷移できるようにした
- ダークテーマでも文字やカードの視認性が落ちないように調整した
- ファイルごとに役割を分け、初心者でも追いやすい構成にした

## 今後の改善予定

- オペレーター詳細情報の精度向上
- データ更新フローの改善
- 検索結果の並び替え機能
- タグ選択履歴や共有URLの追加
- アクセシビリティ改善
- 画像やスキル情報の更新フロー改善

## 注意

このアプリは個人制作のポートフォリオです。
Arknights / アークナイツの公式サービスではありません。
