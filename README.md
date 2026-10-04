# 天気予報API連携Webアプリ

都市名から天気予報を検索し、日付ごとの情報やグラフを確認するWebアプリです。

> 学習作品：外部API連携やWeb開発の学習成果として掲載しています。

[作品一覧](https://github.com/moedaichi0629-ai/landing-page) · [ポートフォリオ](https://moedaichi0629-ai.github.io/landing-page/)

## 解決する課題

**想定利用者：** 外出前に天気を確認したい利用者

複数日の予報を一覧で比較したいこと。

## 主な機能

- 都市名による天気検索と日付切り替え
- 検索履歴・お気に入りの保存
- 天気データのグラフ表示

## デモ・利用方法

[デモ](https://weather-forecast-app-liart-two.vercel.app/)

## 使用技術

Next.js / React / Tailwind CSS / OpenWeatherMap API / Recharts

## 工夫した点

APIデータの加工、ブラウザ保存、レスポンシブ表示の学習作品です。

## セットアップ・技術詳細

<details>
<summary>操作方法・構成・設定手順などの詳細を開く</summary>

# アプリ概要

都市名を入力するだけで、その都市の天気予報（気温・天気・湿度・降水確率）を素早く確認できるWebアプリです。

外出や旅行の前に「今日の天気」だけでなく「数日後の天気」もまとめて比較したいという課題を解決します。天気アプリを日常的に使いたい人はもちろん、外部API連携・環境変数管理・レスポンシブUIをまとめて学びたいWeb開発の学習者にも向けた構成になっています。

---

# アプリURL

https://weather-forecast-app-liart-two.vercel.app/

---

# 実装した機能

1. **都市名検索フォーム**
   何ができるか: テキスト欄に都市名（例: Tokyo）を入力して検索できます。
   流れ: 入力 → 検索ボタン押下 → OpenWeatherMap APIへリクエスト。入力が空の場合はボタンが非活性になり、無駄なリクエストを防ぎます。

2. **天気情報のカード表示**
   何ができるか: 都市名・国コード・日付・気温・天気・最高/最低気温・湿度・降水確率を表示します。
   流れ: APIレスポンスを取得 → 表示用データに整形 → カードUIにレンダリング。気温は最も大きな文字で表示し、湿度・降水確率はグリッドで並べて一目で分かるようにしています。

3. **日付選択による予報の切り替え**
   何ができるか: 取得した予報の中から見たい日付を選び、その日の予報に表示を切り替えられます。
   流れ: OpenWeatherMapの3時間ごとの予報データを1日単位に集計 → 日付ボタンを横並びで表示 → クリックすると選択状態(state)が更新され、該当日のカードに切り替わります。

4. **ローディング表示**
   何ができるか: API通信中であることをユーザーに知らせます。
   流れ: 検索実行と同時に「読み込み中...」を表示し、レスポンスが返るまで結果を表示しません。

5. **エラーハンドリング**
   何ができるか: 都市が見つからない・APIキーが無効・通信失敗などの場合に、分かりやすいエラーメッセージを表示します。
   流れ: API呼び出しを try/catch で監視 → 失敗時は「天気情報を取得できませんでした」を表示し、アプリ全体がクラッシュしないようにしています。

6. **レスポンシブデザイン**
   何ができるか: スマートフォンからPCまで、画面幅に応じて見やすいレイアウトになります。
   流れ: Tailwind CSSのFlexbox/Gridとブレークポイントで、要素の並びや余白を画面サイズごとに調整しています。

7. **検索履歴の保存**
   何ができるか: 検索に成功した都市を最大5件まで履歴として保存し、履歴をクリックすると再検索できます。個別に削除もできます。
   流れ: 検索成功 → APIが返した正式な都市名を履歴の先頭に追加（重複は除去し5件を超えた分は自動的に切り捨て）→ `localStorage`（キー: `weather_search_history`）に保存 → ページ再訪問時も履歴を復元して表示します。

8. **お気に入り都市の保存**
   何ができるか: 現在表示中の都市をお気に入り登録・解除でき、一覧から再検索できます。
   流れ: 天気カードの上にある「☆ お気に入りに追加」ボタンを押す → 都市名を`localStorage`（キー: `weather_favorite_cities`）に保存 → 一覧に追加され、クリックで再検索、×ボタンで削除できます。

9. **現在地の天気取得**
   何ができるか: 「📍 現在地の天気を取得」ボタンを押すと、都市名を入力せずに現在地の天気予報を取得できます。都市名検索と同じ天気カードに結果が表示されます。
   流れ: ボタン押下 → ブラウザの位置情報の許可を確認（Geolocation API）→ 許可されたら緯度・経度を取得 → OpenWeatherMap APIに緯度・経度を渡して予報を取得 → 既存のWeatherCardに表示。位置情報が拒否された場合は「位置情報の取得が許可されませんでした」、取得や通信に失敗した場合は「現在地の天気情報を取得できませんでした」を表示します。なお、現在地検索の結果は検索履歴には保存されません（都市名検索の履歴と混同しないための仕様）が、お気に入りへの登録は可能です。

10. **時間帯ごとの天気グラフ**
    何ができるか: 選択中の日付の気温・降水確率の推移を折れ線＋棒グラフで確認できます。グラフ上にカーソルを合わせるとツールチップでその時刻の詳細が表示されます。
    流れ: 天気カードの下にRecharts製のグラフを表示 → 横軸に時刻、左の縦軸に気温（℃）、右の縦軸に降水確率（%）を配置 → 気温は折れ線、降水確率は棒グラフで重ねて表示。日付ボタンを切り替えると、そのままグラフの内容も切り替わります。
    **注意（API仕様の制約）**: OpenWeatherMapの無料プラン「5 Day / 3 Hour Forecast」は名前の通り**3時間ごと**のデータしか提供されません。1時間ごとの真のデータは、別途サブスクリプション契約が必要な「One Call API 3.0」でのみ取得可能です（本アプリでは未契約）。そのため本機能では、実際のデータ間隔である3時間ごとの値（0:00, 3:00, 6:00…21:00の最大8点）をそのままグラフの横軸に使用しています。3時間の間を機械的に補間して1時間刻みに見せることもできますが、実測されていない値をあたかも実データのように表示するのは誤解を招くため、あえて行っていません。より高精度な1時間単位のグラフが必要な場合は、有料のOne Call API 3.0への切り替えを推奨します。

---

# 使用技術

・フロントエンド: Next.js（App Router）, React, TypeScript, Tailwind CSS
・API: OpenWeatherMap API（5 Day / 3 Hour Forecast、都市名検索・緯度経度検索の両対応）
・ブラウザAPI: Geolocation API（現在地の緯度・経度取得）
・グラフ描画: Recharts（時間帯ごとの気温・降水確率グラフ）
・データ永続化: localStorage（検索履歴・お気に入り都市の保存）
・データベース: なし（天気データはAPIから都度取得するため未使用）
・デプロイ: Vercel
・その他: Git / GitHub（バージョン管理）

---

# 機能一覧

| 機能 | 内容 |
|------|------|
| 都市検索 | 都市名を入力して天気予報を取得する |
| 天気カード表示 | 気温・天気・湿度・降水確率をカードUIで表示する |
| 日付切り替え | 5日分の予報を日付ボタンで切り替える |
| ローディング表示 | 通信中に「読み込み中...」を表示する |
| エラー表示 | 取得失敗時に「天気情報を取得できませんでした」を表示する |
| レスポンシブ対応 | スマホ・PC双方で崩れないレイアウトにする |
| 環境変数管理 | APIキーを `.env.local` で管理しコードに直書きしない |
| 検索履歴 | 検索した都市を最大5件まで保存し、クリックで再検索・個別削除ができる |
| お気に入り都市 | 表示中の都市をお気に入り登録・解除でき、一覧から再検索できる |
| 現在地の天気取得 | Geolocation APIで取得した緯度・経度から現在地の天気を表示する |
| 時間帯ごとの天気グラフ | 選択中の日付の気温・降水確率をRechartsの折れ線・棒グラフで表示する |

---

# 実装手順

1. Next.jsプロジェクトを作成する（TypeScript / Tailwind CSS / App Router構成）。
   ```bash
   npx create-next-app@latest weather-forecast-app --typescript --tailwind --eslint --app
   ```
2. [OpenWeatherMap](https://openweathermap.org/api) で無料アカウントを作成し、APIキーを取得する。
3. `.env.local` を作成し、APIキーを設定する。
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=自分のAPIキー
   ```
4. `lib/types.ts` にOpenWeatherMap APIのレスポンス型と、アプリ内で使う型を定義する。
5. `lib/weather.ts` にAPI呼び出し処理と、3時間ごとのデータを1日単位に集計するロジックを実装する。
6. `components/SearchForm.tsx` で都市名入力フォームを実装する。
7. `components/DateSelector.tsx` で日付選択ボタンのUIを実装する。
8. `components/WeatherCard.tsx` で天気情報表示カードを実装する。
9. `app/page.tsx` で各コンポーネントを組み合わせ、検索・ローディング・エラー・結果表示の状態管理を実装する。
10. `next.config.ts` にOpenWeatherMapのアイコン画像を表示するための `images.remotePatterns` を設定する。
11. **検索履歴・お気に入りの保存機能を追加する。**
    - `lib/storage.ts` を作成し、`localStorage` の読み書きをまとめる。キーは `weather_search_history`（履歴・最大5件・重複除去）と `weather_favorite_cities`（お気に入り・重複除去）の2つ。
    - `localStorage` はサーバー上には存在しないため、関数の先頭で `typeof window === "undefined"` を判定し、サーバー実行時は空配列を返すようにする。
    - `useState` の**遅延初期化**（`useState(() => getSearchHistory())`）で初期値を読み込む。`useEffect` 内で `setState` すると不要な再レンダリングが発生するため使わない。
    ```ts
    // lib/storage.ts の呼び出し例
    const [history, setHistory] = useState<string[]>(() => getSearchHistory());
    ```
    - `components/SearchHistory.tsx` と `components/FavoriteCities.tsx` を作成し、一覧表示・選択・削除のUIを実装する。
    - `app/page.tsx` で検索成功時に `addSearchHistory(result.cityName)` を呼び出して履歴に追加し、お気に入りボタンの押下時に `addFavoriteCity` / `removeFavoriteCity` を呼び出す。
12. **現在地の天気取得機能を追加する。**
    - `lib/types.ts` に緯度・経度を表す `Coordinates` 型を追加する。
    - `lib/weather.ts` の内部処理を共通化し、都市名（`q`パラメータ）と緯度経度（`lat`/`lon`パラメータ）のどちらでも呼び出せる `fetchForecastByCoords(coords)` を追加する（既存の `fetchCityForecast(city)` はそのまま利用可能）。
    - `components/CurrentLocationButton.tsx` を作成し、ボタン押下時に **Geolocation API** を呼び出す。
      ```ts
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // position.coords.latitude / position.coords.longitude が取得できる
        },
        (error) => {
          // 許可されなかった場合は error.code === error.PERMISSION_DENIED
        }
      );
      ```
    - `app/page.tsx` に、取得した緯度・経度で `fetchForecastByCoords` を呼び出し、結果を既存の `WeatherCard` にそのまま表示する処理を追加する。都市名検索と同じ `forecast` / `selectedDate` / `isLoading` / `error` の状態をそのまま使い回すことで、二重管理を避ける。
    - 位置情報が拒否された場合は「位置情報の取得が許可されませんでした」、それ以外の失敗時は「現在地の天気情報を取得できませんでした」を表示する。現在地取得の結果は `addSearchHistory` を呼ばないため検索履歴には残らない。
13. **時間帯ごとの天気グラフを追加する。**
    - Rechartsをインストールする。
      ```bash
      npm install recharts
      ```
    - `lib/types.ts` に、1時点分のデータを表す `HourlyPoint`（`hour` / `temp` / `pop`）を追加し、`DailyForecast` に `hourly: HourlyPoint[]` を持たせる。
    - `lib/weather.ts` の `groupByDay` で、日ごとにまとめる際に3時間ごとの各エントリを `hourly` 配列としてそのまま保持する（時刻でソート）。
    - `components/HourlyWeatherChart.tsx` を作成し、Rechartsの `ComposedChart` で気温（`Line`・左軸）と降水確率（`Bar`・右軸）を1つのグラフに重ねて表示する。ツールチップは`content`にカスタムコンポーネントを渡し、Tailwindのクラスでダークモード対応する。
    - グラフの罫線・軸ラベルの色は `stroke="currentColor"` / `tick={{ fill: "currentColor" }}` を使い、親要素のTailwindテキストカラー（`text-slate-500 dark:text-slate-400`）を継承させることで、ライト/ダーク両方で見やすい配色にする。
    - `app/page.tsx` で、天気カードの下に `<HourlyWeatherChart hourly={selectedDay.hourly} />` を追加する。日付ボタンで `selectedDate` を切り替えると、渡す `hourly` も自動的に切り替わる。
14. ローカルで動作確認する。
    ```bash
    npm install
    npm run dev
    ```
15. GitHubにリポジトリを作成し、コードをpushする。
    ```bash
    git init
    git add .
    git commit -m "Add weather forecast app with OpenWeatherMap API"
    git branch -M main
    git remote add origin <リポジトリURL>
    git push -u origin main
    ```
16. Vercelにリポジトリを連携し、Environment VariablesにAPIキーを設定してデプロイする。

> **注意**: Geolocation APIはセキュリティ上の理由から、`localhost` を除き **HTTPS環境でのみ動作**します。Vercelにデプロイした本番URLは自動でHTTPS化されるため問題ありません。

---

# ディレクトリ構成

```
weather-forecast-app/
├── app/                     # ルーティングとページ本体（App Router）
│   ├── layout.tsx           # 全ページ共通のレイアウト・メタデータ
│   ├── page.tsx             # トップページ。状態管理と画面全体の構成を担当
│   └── globals.css          # Tailwindの読み込みとグローバルスタイル
├── components/              # 画面を構成するUI部品
│   ├── SearchForm.tsx       # 都市名入力フォーム
│   ├── DateSelector.tsx     # 日付選択ボタン群
│   ├── WeatherCard.tsx      # 天気情報表示カード
│   ├── SearchHistory.tsx    # 検索履歴の一覧・選択・削除UI
│   ├── FavoriteCities.tsx   # お気に入り都市の一覧・選択・削除UI
│   ├── CurrentLocationButton.tsx # Geolocation APIで現在地を取得するボタン
│   └── HourlyWeatherChart.tsx    # Rechartsによる時間帯ごとの気温・降水確率グラフ
├── lib/                     # ロジック・型定義
│   ├── types.ts             # APIレスポンス型・アプリ内で使う型定義（座標型・時間帯データ型を含む）
│   ├── weather.ts           # API呼び出し（都市名/緯度経度）と日別・時間帯データの集計ロジック
│   └── storage.ts           # 検索履歴・お気に入りのlocalStorage永続化
├── public/                  # 静的ファイル置き場
├── .env.local.example       # 環境変数のテンプレート
└── next.config.ts           # 画像ドメインなどのNext.js設定
```

---

# 工夫した点

- **UI**: 気温を最も大きな文字で表示し、天気・湿度・降水確率をグリッドレイアウトでひと目で把握できるようにした。
- **コード設計**: API通信・データ整形ロジック（`lib/weather.ts`）、永続化ロジック（`lib/storage.ts`）、表示コンポーネント（`components/`）を分離し、役割ごとにファイルを分けることで見通しと保守性を高めた。
- **保守性**: OpenWeatherMap APIのレスポンス型を `types.ts` に集約し、型安全にデータを扱えるようにした。実際に使う値だけを型定義に残し、未使用フィールドを持たせないようにした。
- **既存機能を壊さない設計**: 検索履歴・お気に入り機能はすべて新規ファイル（`lib/storage.ts`, `components/SearchHistory.tsx`, `components/FavoriteCities.tsx`）として追加し、既存の `SearchForm` / `WeatherCard` / `DateSelector` の実装やAPI呼び出しロジックには一切手を加えていない。
- **データの永続化**: 検索履歴・お気に入りは `localStorage` に保存し、ページを再訪問しても状態が引き継がれるようにした。都市名はAPIが返す正式名称で保存することで、表記ゆれ（大文字小文字など）による重複や再検索失敗を防いでいる。
- **レスポンシブ対応**: Tailwind CSSのブレークポイント（`sm:`）とFlexbox/Gridで、スマホからPCまで崩れないレイアウトにした。履歴・お気に入りは折り返し表示（`flex-wrap`）にして、件数が増えてもスマホ幅で崩れないようにした。
- **ユーザー体験**: 入力欄が空の場合は検索ボタンを非活性にして無効な検索を防止。履歴・お気に入りが空の場合も「まだありません」という案内文を表示し、機能の存在が分かるようにした。
- **エラーハンドリング**: APIキー未設定・通信失敗・都市が見つからない場合など、あらゆる失敗パターンを1つの分かりやすいエラーメッセージに集約し、アプリがクラッシュしないようにした。
- **既存機能を壊さない設計（現在地取得）**: `fetchCityForecast` は変更せず、共通のリクエスト処理を切り出したうえで新たに `fetchForecastByCoords` を追加する形にした。`app/page.tsx` 側も、都市名検索用の `handleSearch` はそのまま残し、現在地取得用に `handleLocate` / `handleLocationError` を新設することで、既存の検索フローに影響を与えないようにした。
- **現在地取得の許可・拒否への対応**: `navigator.geolocation.getCurrentPosition` の成功・失敗コールバックをそれぞれハンドリングし、拒否時（`PERMISSION_DENIED`）とそれ以外の失敗時でメッセージを出し分けた。ボタン自身も取得中は非活性化し、二重クリックを防止した。
- **表示の一貫性**: 都市名検索・現在地取得のどちらの結果も同じ `forecast` / `WeatherCard` に表示することで、ユーザーから見て取得方法の違いを意識させない設計にした。
- **データの正直さ（時間帯グラフ）**: OpenWeatherMapの無料プランは3時間ごとのデータしか提供しないため、1時間ごとのデータに補間・水増しすることはせず、実際に取得できた3時間間隔の値だけをグラフに表示するようにした。実測されていない値を実データのように見せないという判断を優先した。
- **グラフの見やすさ**: 気温（折れ線）と降水確率（棒グラフ）を左右2つの縦軸に分けて1つのグラフに重ねることで、単位が異なる2種類の情報を1画面で比較できるようにした。ツールチップで時刻ごとの正確な数値も確認できる。
- **ダークモード対応（グラフ）**: Rechartsの罫線・軸ラベルに `stroke="currentColor"` / `fill: "currentColor"` を指定し、親要素のTailwindテキストカラー（`dark:` バリアント込み）を継承させることで、ライト/ダークどちらの配色にも追従するようにした。ツールチップは独自のHTMLコンポーネントとして実装し、Tailwindの `dark:` クラスで背景・文字色を調整した。
- **スマホ対応（グラフ）**: グラフ横幅が狭い画面では `overflow-x-auto` で横スクロールできるようにし、軸ラベルが潰れて読めなくならないようにした。

---

# 今後追加したい機能

1. **1時間単位の詳細な天気グラフ（One Call API 3.0への切り替え）**
   どんな人に役立つか: より細かい時間単位で天気の変化を把握したい人。
   どんな場面で使うか: 屋外での短時間イベントや、通勤・通学時間帯だけの天気を細かく確認したいとき。
   メリット: 現在の3時間間隔より高い解像度で気温・降水確率の変化を追える。

2. **7日間の週間予報への対応（有料APIプランへの切り替え）**
   どんな人に役立つか: より長期の予定を立てたい人。
   どんな場面で使うか: 旅行や屋外イベントの計画時。
   メリット: 現在の5日間より長いスパンで天気を見通せる。

3. **お気に入り都市の並び替え・グループ分け**
   どんな人に役立つか: お気に入り登録数が多くなったヘビーユーザー。
   どんな場面で使うか: 「自宅」「実家」「出張先」など用途別に整理したいとき。
   メリット: 一覧が増えても目的の都市をすぐ見つけられる。

---

# 学んだこと

- **技術面**: Next.js App RouterでのServer Component / Client Componentの使い分けと、`next/image` で外部ドメインの画像を表示する際の `images.remotePatterns` 設定方法を学んだ。
- **エラー対応**: OpenWeatherMapは発行直後のAPIキーがすぐには有効化されず、`401 Invalid API key` になる仕様があることを実際のエラーを通じて学んだ。「キー発行後は反映まで時間がかかる」という前提を踏まえたエラーメッセージ設計の重要性を理解した。
- **設計**: APIレスポンスの整形処理をUIコンポーネントから切り離すことで、変更やレビューがしやすくなることを実感した。
- **Git/GitHub**: `.gitignore` の設定不備で意図せずAPIキーや不要なファイルをコミットしてしまうリスクを学び、コミット前に `git status` や `git diff --cached` で確認する習慣の重要性を理解した。
- **API連携**: OpenWeatherMapの無料プランでは7日間の週間予報が取得できず、5日間/3時間ごとの予報データを自前で日別に集計する必要があることを学んだ。
- **localStorageとReactの状態同期**: `localStorage` の読み込みを `useEffect` 内で `setState` すると、ESLintの `react-hooks/set-state-in-effect` ルールに抵触し、余計な再レンダリングも発生することを学んだ。当初は `useState` の遅延初期化関数を使ったが、実際にデータがある状態でハイドレーションエラーが発生し、最終的に `useSyncExternalStore` に切り替えて解決した。サーバーとクライアントで異なる値を扱う場合は、遅延初期化だけでは不十分なケースがあることを学んだ。
- **既存アプリへの機能追加**: 既存のコンポーネントやロジックを変更せず、新規ファイルの追加と `app/page.tsx` での配線のみで機能を拡張できるよう設計することで、既存機能への影響範囲を最小限に抑えられることを学んだ。
- **Geolocation API**: `navigator.geolocation.getCurrentPosition` は成功・失敗の2つのコールバックを取る非Promise形式のAPIであること、許可拒否は `PermissionDeniedError`（`error.code === error.PERMISSION_DENIED`）として区別できることを学んだ。また、本番運用ではHTTPS環境でなければ動作しない制約があることも把握した。
- **Recharts**: `ComposedChart` で異なる種類のグラフ（`Line`と`Bar`）や異なる単位の縦軸（気温と%）を1つのグラフに重ねられることを学んだ。またSVGベースのライブラリでダークモードに対応させる際は、Tailwindの `dark:` クラスをSVG要素に直接当てるのではなく、`stroke`/`fill` に `currentColor` を指定して親要素の文字色を継承させる方法が有効だと分かった。
- **APIデータの加工**: OpenWeatherMapの3時間ごとのデータをそのままグラフの元データとして使うか、1時間刻みに補間するかを検討し、実測されていない値を作り出さない方針を選んだ。表示上の見栄えよりもデータの正確さを優先する判断基準を学んだ。
- **改善点**: 現状はAPIキーをクライアント側（`NEXT_PUBLIC_`）で保持しているため、今後はNext.jsのRoute Handler経由でAPIキーをサーバー側に隠す設計に改善したい。

---

# 環境変数

`.env.local` に以下を設定します。

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=自分のAPIキー
```

# 起動方法

```bash
npm install
npm run dev
```

# 注意点

`.env.local` はGitHubに保存しないでください。
Vercelにデプロイする場合は、VercelのEnvironment VariablesにAPIキーを設定してください。

</details>

