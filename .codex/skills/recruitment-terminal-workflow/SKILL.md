---
name: recruitment-terminal-workflow
description: Recruitment Terminal リポジトリの作業フロー。作業再開・終了、ローカルサーバー、GitHubのIssue・PR、検証、マージを扱うときに使用する。
---

# Recruitment Terminal Workflow

Recruitment Terminal プロジェクトの定常作業にこの skill を使用する。

## Project Location

標準のリポジトリパス:

`C:\Projects\公開求人`

現在の workspace が異なる場合は、`README.md`, `package.json`, `src/components/RecruitmentApp.tsx` がある場所を確認してリポジトリを探す。

## Start Work

ユーザーが `作業再開` と言ったら:

1. リポジトリルートで `npm.cmd run dev` を実行し、ローカル開発サーバーを起動する。
2. ローカル URL はコードブロックに入れず、通常のテキストで報告する。
3. Next.js が別ポートを表示しない限り、`http://localhost:3000` を優先する。
4. 文脈確認が必要な場合は、役に立つ最小限の範囲だけ読む:
   - `docs/project-status.md`
   - `docs/file-roles.md`
   - ユーザーの依頼に直接関係するファイル。

## Context Budget

通常作業では、読む範囲を狭く保つ:

- まず `docs/project-status.md` だけ読むことを優先する。
- `README.md` は、外部向けの説明文、セットアップ、ポートフォリオ文脈が必要なときだけ読む。
- `docs/file-roles.md` は、ファイルの責務確認や学習用説明が必要なときだけ読む。
- データ確認が必要な場合を除き、大きな JSON ファイルは読まない。可能ならファイル全体を読む代わりに、script で必要な ID だけ確認する。
- 対象範囲が明確な依頼では、ユーザーが指定したファイルと、それらが直接 import している helper / component だけ読む。
- ユーザーが説明を求めていない限り、プロジェクト背景を繰り返し説明しない。

## End Work

ユーザーが `作業終了` と言ったら:

1. このプロジェクト用に起動したローカル開発サーバーを停止する。
2. サーバー session を確認できない場合のみ、port 3000 を確認する。
3. 作業中の変更とGitHubの状態を確認し、依頼された開発作業は下記の共通手順に沿って完了させる。無関係な未コミット差分は含めない。
4. サーバーを停止したか、すでに停止済みだったかを報告する。

## GitHub Workflow

Samのローカル環境では、Issue・PR・レビュー・マージ・手動テストの基本は `C:\Users\assy0\Documents\Codex\DEVELOPMENT_WORKFLOW.md` に従う。このファイルを参照できない環境では、Issueに目的と完了条件を記し、PRで変更内容と確認結果を示し、レビューとChecksの後にマージする。手動テストは結果を追加コメントに記録してからIssueを閉じる。現在のユーザー指示と、このリポジトリの固有ルールを優先する。

開発依頼では変更範囲を確認し、必要な検証後に意図したファイルだけcommit・pushしてPRを作る。レビュー指摘とChecksに問題がなければマージまで進める。仕様の大きな変更やデータ損失につながる判断は先に相談する。

PRでは `npm test`・lint・buildを確認し、画面や公開データに関わる変更は必要に応じて公開版の手動テストケースをまとめて用意する。

## Validation Defaults

コードまたは UI を変更した場合:

- `npm.cmd test` を実行する。
- `npm.cmd run lint` を実行する。
- `npm.cmd run build` を実行する。
- ドキュメントのみの変更では、通常 lint / build は不要。

## Reporting Style

日本語で、簡潔な見出しに分けて報告する:

- 実施内容
- 変更ファイル
- 動作確認結果
- 残課題

ユーザーは生の terminal output を見ないため、コマンド結果は文章で説明する。

## Project Docs

最低限の情報源として次を使う:

- `README.md`: 外部向けの概要とセットアップ。
- `docs/project-status.md`: 現在のプロジェクト状況と AI 協業ルール。
- `docs/file-roles.md`: ファイルの責務と読む順番。
- `docs/learning/`: 学習教材。学習 docs に関する作業のときだけ読む。
