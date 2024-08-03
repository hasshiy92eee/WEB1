# ビルドステージ
FROM node:18 AS build

WORKDIR /app

# パッケージの依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# ビルドを実行
RUN npm run build

# ランタイムステージ
FROM nginx:alpine

# ビルド済みのアプリケーションを Nginx のデフォルトのディレクトリにコピー
COPY --from=build /app/build /usr/share/nginx/html

# 必要に応じて Nginx の設定ファイルを追加
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
