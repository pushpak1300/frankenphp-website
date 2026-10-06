---
title: "Early Hints"
sidebar:
  label: "Early Hintsサポート（103 HTTPステータスコード）"
  order: 0
seo:
  description: "FrankenPHPは103 Early Hints ステータスコードをネイティブサポートしています。 Early Hintsを使用することで、ウェブページの読み込み時間を30%改善できます。"
---
FrankenPHPは[103 Early Hints ステータスコード](https://developer.chrome.com/blog/early-hints/)をネイティブサポートしています。
Early Hintsを使用することで、ウェブページの読み込み時間を30%改善できます。

```php
<?php

header('Link: </style.css>; rel=preload; as=style');
headers_send(103);

// 遅いアルゴリズムとSQLクエリ 🤪

echo <<<'HTML'
<!DOCTYPE html>
<title>Hello FrankenPHP</title>
<link rel="stylesheet" href="style.css">
HTML;
```

Early Hintsは通常モードと[ワーカー](/docs/worker)モードの両方でサポートされています。
