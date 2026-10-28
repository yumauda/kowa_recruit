# 恒和工業 採用サイト

## 開発

- 初回のみ `npm install` を実行します。
- 開発時は `npm run dev` を実行します。
- Sassは `src/sass/`、画像原本は `src/images/`、JavaScriptは `js/`で管理します。
- CSSは `css/`、圧縮画像は `images/`へ直接出力されます。

## アップロード

この案件では`dist/`を使用しません。公開時はプロジェクト直下の次のファイルとフォルダを、そのままサーバーへアップロードします。

- `index.html`
- `company/`、`works/`、`people/`、`interview/`、`career/`、`environment/`、`recruit/`
- `css/`
- `images/`
- `js/`
- `fonts/`
- `mail.php`

アップロード前に`npm run prepare:upload`を実行すると、画像とCSSの公開ファイルが更新されます。`npm run build`も同じ処理を実行し、`dist/`は生成しません。

`node_modules/`、`src/`、`scripts/`、`package.json`、`package-lock.json`、`vite.config.js`はアップロードしません。
