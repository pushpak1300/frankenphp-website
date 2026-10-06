---
title: "FrankenPHP: PHPのためのモダンなアプリケーションサーバー"
sidebar:
  label: "概要"
seo:
  description: "FrankenPHPは、Caddy Webサーバーをベースに構築された、PHPのためのモダンなアプリケーションサーバーです。"
---
FrankenPHPは、[Caddy](https://caddyserver.com/) Webサーバーをベースに構築された、PHPのためのモダンなアプリケーションサーバーです。

FrankenPHPは、[_Early Hints_](/docs/early-hints)、[ワーカーモード](/docs/worker)、[リアルタイム機能](/docs/mercure)、自動HTTPS、HTTP/2、HTTP/3などの驚異的な機能により、あなたのPHPアプリに強力な力を与えます。

FrankenPHPはあらゆるPHPアプリと連携し、ワーカーモードの公式統合によってLaravelやSymfonyプロジェクトをこれまで以上に高速化します。

また、FrankenPHPはスタンドアロンのGoライブラリとしても利用可能で、`net/http`を使って任意のアプリにPHPを埋め込むことができます。

[**詳しくは** _frankenphp.dev_](/)と、このスライド資料もご参照ください：

<a href="https://dunglas.dev/2022/10/frankenphp-the-modern-php-app-server-written-in-go/"><img src="https://dunglas.dev/wp-content/uploads/2022/10/frankenphp.png" alt="Slides" width="600"></a>

## はじめに

Windowsをお使いの場合は、[WSL](https://learn.microsoft.com/windows/wsl/)を使用してFrankenPHPを実行してください。

### インストールスクリプト

以下のコマンドをターミナルに貼り付けると、環境に合ったバージョンが自動的にインストールされます：

```console
curl https://frankenphp.dev/install.sh | sh
```

### スタンドアロンバイナリ

LinuxとmacOS向けに、開発用途の静的FrankenPHPバイナリを提供しています。
[PHP 8.4](https://www.php.net/releases/8.4/en.php)と主要なPHP拡張が含まれます。

[FrankenPHPをダウンロード](https://github.com/php/frankenphp/releases)

**拡張のインストール：** よく使われる拡張は同梱されています。追加の拡張をインストールすることはできません。

### rpm パッケージ

メンテナーが `dnf` を使用するすべてのシステム向けに rpm パッケージを提供しています。インストール方法：

```console
sudo dnf install https://rpm.henderkes.com/static-php-1-0.noarch.rpm
sudo dnf module enable php-zts:static-8.4 # 8.2-8.5 利用可能
sudo dnf install frankenphp
```

**拡張のインストール：** `sudo dnf install php-zts-<extension>`

デフォルトで提供されていない拡張については [PIE](https://github.com/php/pie) を使用してください：

```console
sudo dnf install pie-zts
sudo pie-zts install asgrim/example-pie-extension
```

### deb パッケージ

メンテナーが `apt` を使用するすべてのシステム向けに deb パッケージを提供しています。インストール方法：

```console
sudo curl -fsSL https://key.henderkes.com/static-php.gpg -o /usr/share/keyrings/static-php.gpg && \
echo "deb [signed-by=/usr/share/keyrings/static-php.gpg] https://deb.henderkes.com/ stable main" | sudo tee /etc/apt/sources.list.d/static-php.list && \
sudo apt update
sudo apt install frankenphp
```

**拡張のインストール：** `sudo apt install php-zts-<extension>`

デフォルトで提供されていない拡張については [PIE](https://github.com/php/pie) を使用してください：

```console
sudo apt install pie-zts
sudo pie-zts install asgrim/example-pie-extension
```

### Docker

また、[Dockerイメージ](/docs/docker)も利用可能です：

```console
docker run -v .:/app/public \
    -p 80:80 -p 443:443 -p 443:443/udp \
    dunglas/frankenphp
```

ブラウザで`https://localhost`にアクセスして、FrankenPHPをお楽しみください！

<div class="fp-callout" data-callout="tip">
<p class="fp-callout-title">ヒント</p>

`https://127.0.0.1`ではなく、`https://localhost`を使用して、自己署名証明書を受け入れてください。
使用するドメインを変更したい場合は、[`SERVER_NAME` 環境変数](/docs/config#environment-variables)を設定してください。

</div>

### Homebrew

FrankenPHPはmacOSおよびLinux向けに[Homebrew](https://brew.sh)パッケージとしても利用可能です。

インストール方法：

```console
brew install dunglas/frankenphp/frankenphp
```

**拡張のインストール：** [PIE](https://github.com/php/pie) を使用してください。

### 使い方

現在のディレクトリのコンテンツを配信するには、以下を実行してください：

```console
frankenphp php-server
```

コマンドラインスクリプトも実行できます：

```console
frankenphp php-cli /path/to/your/script.php
```

deb / rpm パッケージの場合は、systemd サービスを起動することもできます：

```console
sudo systemctl start frankenphp
```

## ドキュメント

- [クラシックモード](/docs/classic)
- [ワーカーモード](/docs/worker)
- [Early Hintsサポート（103 HTTPステータスコード）](/docs/early-hints)
- [リアルタイム](/docs/mercure)
- [大きな静的ファイルの効率的な提供](/docs/x-sendfile)
- [設定](/docs/config)
- [Dockerイメージ](/docs/docker)
- [本番環境でのデプロイ](/docs/production)
- [パフォーマンス最適化](/docs/performance)
- [**スタンドアロン**、自己実行可能なPHPアプリの作成](/docs/embed)
- [静的バイナリの作成](/docs/static)
- [ソースからのコンパイル](/docs/compile)
- [FrankenPHPの監視](/docs/metrics)
- [Laravel統合](/docs/laravel)
- [既知の問題](/docs/known-issues)
- [デモアプリ（Symfony）とベンチマーク](https://github.com/dunglas/frankenphp-demo)
- [Goライブラリドキュメント](https://pkg.go.dev/github.com/dunglas/frankenphp)
- [コントリビューションとデバッグ](/docs/contributing)

## 例とスケルトン

- [Symfony](https://github.com/dunglas/symfony-docker)
- [API Platform](https://api-platform.com/docs/symfony)
- [Laravel](/docs/laravel)
- [Sulu](https://sulu.io/blog/running-sulu-with-frankenphp)
- [WordPress](https://github.com/StephenMiracle/frankenwp)
- [Drupal](https://github.com/dunglas/frankenphp-drupal)
- [Joomla](https://github.com/alexandreelise/frankenphp-joomla)
- [TYPO3](https://github.com/ochorocho/franken-typo3)
- [Magento2](https://github.com/ekino/frankenphp-magento2)
