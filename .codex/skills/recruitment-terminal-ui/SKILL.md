---
name: recruitment-terminal-ui
description: Recruitment Terminal プロジェクトの UI デザイン指針。アプリの見た目、レイアウト、テーマカラー、カード密度、ボタン、影、アークナイツ風の端末UI、レスポンシブ対応、候補カードの読みやすさを変更・確認するときに使用する。
---

# Recruitment Terminal UI

Recruitment Terminal プロジェクトの UI 判断にこの skill を使用する。

## Design Direction

公式 UI をそのままコピーせず、アークナイツ風の雰囲気を持つインターフェースを目指す。

中心に置く雰囲気:

- 戦術端末
- 工業製品の制御パネル
- Military HUD
- ライトモードでは CAD / 計測機器のような印象
- 情報密度は高いが、読みやすい検索ツール

ダークモードは戦術端末のように見せる。
ライトモードは設計資料や制御盤のように見せる。

## Prefer

- ダークグレー / ニュートラルグレーの面。
- 細い境界線と、分かりやすいパネル階層。
- メインアクセントはオレンジ。使いすぎない。
- シアンは system / status 系のアクセントに限定する。
- 奥行きを抑えたフラットなボタン。
- 形、余白、境界線、タイポグラフィで階層を作る。
- 検索効率を優先したコンパクトな候補カード。
- スマホでも読みやすさを保つレスポンシブレイアウト。

## Avoid

- 強いネオン発光。
- Glassmorphism。
- Apple 風の柔らかい UI。
- かわいい印象や、角丸が強すぎるスタイル。
- 多くの要素に重い drop shadow を使うこと。
- 状態や構造を伝えない装飾要素。
- 斜めカットライン、ドット、背景効果の多用。
- 装飾のためにキャラクター画像や文字の視認性を下げること。

## Current UI Rules

- 候補カードは豪華さよりも、一覧としての読みやすさを優先する。
- 候補グリッドは利用可能な横幅を自然に使う。
- カード列数を実際の表示幅に合わせたい場合は `auto-fit` / `minmax` を使う。
- 明示的な依頼がない限り、スマホでは 1 カラムを維持する。
- サイドフィルターの読みやすさを保つ。タグボタンを小さくしすぎない。
- 影は例外的に使う。基本は境界線、パネル、面の色差で表現する。
- テーマ切り替えは小さく、フラットで、端末 UI らしく保つ。

## Common Files

作業内容に関係するファイルだけ読む:

- `src/app/globals.css`: 共通の色、面、ボタン、パネル。
- `src/components/Header.tsx`: ヘッダーとテーマ切り替えの配置。
- `src/components/RecruitmentApp.tsx`: トップ画面のレイアウトと、サイドバー / 結果エリアの比率。
- `src/components/TagGroup.tsx`: タグボタン。
- `src/components/SelectedTags.tsx`: 選択中タグのコントロールパネル。
- `src/components/CombinationCandidates.tsx`: 候補グループ、レスポンシブな結果グリッド、開閉表示。
- `src/components/OperatorCard.tsx`: コンパクトな候補オペレーターカード。
- `src/app/operators/[id]/page.tsx`: オペレーター詳細画面のレイアウト。
- `src/components/OperatorSdModel.tsx`: SD モデルと戦闘情報カード。

## Scope Shortcuts

無関係な UI コードを読み直しすぎないため、次の範囲を目安にする:

- トップ / 検索画面: `RecruitmentApp.tsx`, `TagGroup.tsx`, `SelectedTags.tsx`, `CombinationCandidates.tsx`, `OperatorCard.tsx`, 関連する `globals.css`。
- オペレーター詳細画面: `src/app/operators/[id]/page.tsx`, `OperatorSdModel.tsx`, `operatorEnglishNames.json`, `operatorRanges.json`, 必要なオペレーターのレコードだけ。
- テーマ / ヘッダー: `Header.tsx`, `ThemeToggle.tsx`, 関連する `globals.css`。
- 表示補正データ: オペレーターごとの CSS class を増やすより、`operatorDisplaySettings.json` のような小さなローカル JSON を優先する。

ユーザーが明示的に対象外とした範囲は、直接の依存関係がない限り確認・変更しない。

## Operator Detail Art Rules

詳細画面の立ち絵では、次を守る:

- L 字コーナー装飾を視覚的なフレームとして扱う。
- 武器やエフェクトをすべて見せることより、顔、胴体、足元が自然に見えることを優先する。
- オペレーターごとの極端な拡大縮小は避ける。背が高い、または細い立ち絵が見切れやすくなる。
- まず安定した共通ステージを作り、外れ値だけ `scale`, `x`, `y` の小さなデータ補正で調整する。
- オペレーターごとの CSS class を大量に追加しない。

## UI Change Workflow

1. 編集前に、関係するコンポーネントと CSS を確認する。
2. ユーザーが求めていない限り、既存のデータ構造と挙動を維持する。
3. 変更は小さく、範囲を絞る。
4. レイアウト変更ではスマホ表示への影響も確認する。
5. docs のみの変更でない限り、実装後に `npm.cmd run lint` と `npm.cmd run build` を実行する。
6. 何を、なぜ変更したかを日本語で報告する。
