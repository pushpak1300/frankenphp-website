---
title: "Early Hints"
sidebar:
  label: "Suporte a Early Hints (código de status HTTP 103)"
  order: 0
seo:
  description: "O FrankenPHP suporta nativamente o código de status 103 Early Hints. Usar Early Hints pode melhorar o tempo de carregamento das suas páginas web em 30%."
---
O FrankenPHP suporta nativamente o
[código de status 103 Early Hints](https://developer.chrome.com/blog/early-hints/).
Usar Early Hints pode melhorar o tempo de carregamento das suas páginas web em
30%.

```php
<?php

header('Link: </style.css>; rel=preload; as=style');
headers_send(103);

// seus algoritmos e consultas SQL lentos 🤪

echo <<<'HTML'
<!DOCTYPE html>
<title>Olá FrankenPHP</title>
<link rel="stylesheet" href="style.css">
HTML;
```

As Early Hints são suportadas tanto pelo modo normal quanto pelo modo
[worker](/docs/worker).
