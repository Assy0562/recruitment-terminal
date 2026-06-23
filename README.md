# Recruitment Terminal

アークナイツの公開求人をモチーフにした、タグ検索型のオペレーター候補確認ツールです。

就活用ポートフォリオとして、既存サイトの丸コピーではなく、タグ選択から候補確認、オペレーター詳細閲覧までをスムーズに行えるUIを目指して制作しています。データはローカルJSONで管理し、DBやログイン機能を使わないシンプルな構成にしています。

## 公開URL

https://recruitment-terminal.vercel.app/

## リポジトリ

https://github.com/Assy0562/recruitment-terminal

## 主な機能

- 公開求人タグの選択
- 選択タグから有効なタグ組み合わせ候補を表示
- 組み合わせごとのスカウト可能オペレーター表示
- オペレーターカードから詳細ページへ遷移
- 詳細ページで以下の情報を表示
  - 日本語名 / 英語名
  - レアリティ
  - 職業 / 職分 / 配置
  - 立ち絵
  - SDモデル
  - ブロック数
  - 昇進2ベースの攻撃範囲
  - 配置マス
  - 特性 / 素質 / スキル
- タグ選択状態の保持
- ダーク / ライトテーマ切り替え
- スマートフォン対応のレスポンシブUI

## UIコンセプト

アークナイツ本家UIに見られる、戦術端末・工業製品・ミリタリーHUDの雰囲気を参考にしています。

- 黒とグレーを基調にした端末風UI
- オレンジを控えめなアクセントとして使用
- 細い罫線、低彩度のパネル、情報密度のあるレイアウト
- 強いネオンや過度な装飾を避けたフラット寄りのボタン
- 詳細画面ではキャラクター立ち絵を主役にした2カラム構成
- SDモデルと戦闘情報をサブカードとして整理

## 使用技術

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- ローカルJSONデータ管理
- Vercel

## データ管理

DBやログイン機能は使わず、ローカルJSONを中心に管理しています。

```text
src/data/
  operators.json
  tags.json
  operatorEnglishNames.json
  operatorRanges.json
```

- `operators.json`: 公開求人対象オペレーターの基本情報
- `tags.json`: 公開求人タグ情報
- `operatorEnglishNames.json`: 詳細画面とSDモデル表示に使う英語名
- `operatorRanges.json`: 昇進2ベースの攻撃範囲と配置マス

この構成にすることで、初心者でもデータ追加や修正をしやすく、アプリ本体のロジックとデータを分けて保守できます。

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

## 学習メモ

- [ファイル構成と役割メモ](docs/file-roles.md)
- [AI協業用の現在地メモ](docs/project-status.md)

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
    OperatorSdModel.tsx
    ThemeToggle.tsx
  data/
    operators.json
    tags.json
    operatorEnglishNames.json
    operatorRanges.json
  lib/
    recruit.ts
  types/
    operator.ts
```

## 工夫した点

- タグ選択と候補表示を分け、検索状態が分かりやすい構成にした
- 完全一致だけでなく、選択タグ内で有効な組み合わせ候補を表示できるようにした
- オペレーターカード全体をクリック可能にし、詳細ページへ自然に遷移できるようにした
- 詳細ページにSDモデル、英語名、ブロック数、攻撃範囲、配置マスを追加した
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

このアプリは個人制作のポートフォリオです。Arknights / アークナイツの公式サービスではありません。
