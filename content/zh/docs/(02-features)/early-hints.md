---
title: "早期提示"
sidebar:
  label: "早期提示支持(103 HTTP status code)"
  order: 0
seo:
  description: "FrankenPHP 原生支持 103 Early Hints 状态码。 使用早期提示可以将网页的加载时间缩短 30%。"
---
FrankenPHP 原生支持 [103 Early Hints 状态码](https://developer.chrome.com/blog/early-hints/)。
使用早期提示可以将网页的加载时间缩短 30%。

```php
<?php

header('Link: </style.css>; rel=preload; as=style');
headers_send(103);

// 慢速算法和 SQL 查询

echo <<<'HTML'
<!DOCTYPE html>
<title>Hello FrankenPHP</title>
<link rel="stylesheet" href="style.css">
HTML;
```

早期提示由普通模式和 [worker](/docs/worker) 模式支持。
