# 天気予報API連携Webアプリ

## アプリ概要
OpenWeatherMap APIを使って、都市名から天気予報を取得できるWebアプリです。

## 実装した機能
- 都市名で天気を検索
- 気温・天気・湿度・降水確率を表示
- 日付を選択して予報を切り替え
- APIキーを環境変数で管理
- エラー表示
- スマホ対応デザイン

## 使用技術
- Next.js
- TypeScript
- Tailwind CSS
- OpenWeatherMap API
- GitHub
- Vercel

## 環境変数
`.env.local` に以下を設定します。

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=自分のAPIキー
```

## 起動方法
```
npm install
npm run dev
```

## 注意点
`.env.local` はGitHubに保存しないでください。
Vercelにデプロイする場合は、VercelのEnvironment VariablesにAPIキーを設定してください。
