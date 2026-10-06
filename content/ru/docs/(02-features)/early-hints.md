---
title: "Early Hints"
sidebar:
  label: "Поддержка Early Hints (103 HTTP статус код)"
  order: 0
seo:
  description: "FrankenPHP изначально поддерживает Early Hints (103 HTTP статус код). Использование Early Hints может улучшить время загрузки ваших веб-страниц на 30%."
---
FrankenPHP изначально поддерживает [Early Hints (103 HTTP статус код)](https://developer.chrome.com/blog/early-hints/).  
Использование Early Hints может улучшить время загрузки ваших веб-страниц на 30%.

```php
<?php

header('Link: </style.css>; rel=preload; as=style');
headers_send(103);

// ваши медленные алгоритмы и SQL-запросы 🤪

echo <<<'HTML'
<!DOCTYPE html>
<title>Hello FrankenPHP</title>
<link rel="stylesheet" href="style.css">
HTML;
```

Early Hints поддерживается как в обычном, так и в [worker режиме](/docs/worker).
