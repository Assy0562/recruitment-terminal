---
name: recruitment-terminal-workflow
description: Recruitment Terminal リポジトリの作業フロー。作業再開、作業終了、ローカルサーバーの起動・停止、プロジェクト状況確認、commit、GitHub への push、この Next.js ポートフォリオプロジェクトの通常検証を行うときに使用する。
---

# Recruitment Terminal Workflow

Recruitment Terminal プロジェクトの定常作業にこの skill を使用する。

## Project Location

標準のリポジトリパス:

`C:\Users\assy0\OneDrive\デスクトップ\公開求人`

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
3. ユーザーが依頼した場合、または現在の作業に push が明確に含まれている場合を除き、自動で push しない。
4. サーバーを停止したか、すでに停止済みだったかを報告する。

## Push Workflow

ユーザーが push を依頼したら:

1. `git status --short` を実行する。
2. 変更ファイルを確認し、無関係なファイルを commit に含めない。
3. コード変更がある場合、最新編集後に検証済みでなければ `npm.cmd run lint` と `npm.cmd run build` の実行を優先する。
4. 意図したファイルだけ stage する。
5. 簡潔な message で commit する。
6. `git push` を実行する。
7. `git status --short` が clean であることを確認する。

## Validation Defaults

コードまたは UI を変更した場合:

- `npm.cmd run lint` を実行する。
- production の挙動に影響する可能性がある変更では `npm.cmd run build` を実行する。
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
