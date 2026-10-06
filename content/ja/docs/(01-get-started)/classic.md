---
title: "クラシックモードの使用"
sidebar:
  label: "クラシックモード"
  order: 0
seo:
  description: "追加の設定を行わなくても、FrankenPHPはクラシックモードで動作します。このモードでは、FrankenPHPは従来のPHPサーバーのように機能し、PHPファイルを直接提供します。これにより、PHP-FPMやmodphpを使ったApacheの置き換えとしてシームレスに利用できます。"
---
追加の設定を行わなくても、FrankenPHPはクラシックモードで動作します。このモードでは、FrankenPHPは従来のPHPサーバーのように機能し、PHPファイルを直接提供します。これにより、PHP-FPMやmod_phpを使ったApacheの置き換えとしてシームレスに利用できます。

Caddyと同様に、FrankenPHPは無制限の接続を受け付け、[固定数のスレッド](/docs/config#caddyfile-config)でそれらを処理します。受け入れられキューに入れられる接続の数は、利用可能なシステムリソースによってのみ制限されます。
PHPスレッドプールは、起動時に初期化された固定数のスレッドで動作し、これはPHP-FPMの静的モードに相当します。また、PHP-FPMの動的モードと同様に、[実行時にスレッドを自動的にスケール](/docs/performance#max_threads)させることも可能です。

キューに入った接続は、PHPスレッドが空くまで無期限に待機します。これを避けるために、FrankenPHP のグローバル設定内の `max_wait_time` [設定](/docs/config#caddyfile-config)を使って、リクエストが空きスレッドを待てる最大時間を制限し、それを超えるとリクエストが拒否されるようにできます。
加えて、[Caddy側で適切な書き込みタイムアウト](https://caddyserver.com/docs/caddyfile/options#timeouts)を設定することも可能です。

各Caddyインスタンスは、1つのFrankenPHPスレッドプールのみを起動し、すべての`php_server`ブロック間でこのプールを共有します。
