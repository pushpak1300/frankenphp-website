---
title: "Early Hints"
sidebar:
  label: "Early Hints desteği (103 HTTP durum kodu)"
  order: 0
seo:
  description: "FrankenPHP 103 Early Hints durum kodunu yerel olarak destekler. Early Hints kullanmak web sayfalarınızın yüklenme süresini %30 oranında artırabilir."
---
FrankenPHP [103 Early Hints durum kodunu](https://developer.chrome.com/blog/early-hints/) yerel olarak destekler.
Early Hints kullanmak web sayfalarınızın yüklenme süresini %30 oranında artırabilir.

```php
<?php

header('Link: </style.css>; rel=preload; as=style');
headers_send(103);

// yavaş algoritmalarınız ve SQL sorgularınız 🤪

echo <<<'HTML'
<!DOCTYPE html>
<title>Hello FrankenPHP</title>
<link rel="stylesheet" href="style.css">
HTML;
```

Early Hints hem normal hem de [worker](/docs/worker) modları tarafından desteklenir.
