---
title: "FrankenPHP: el servidor de aplicaciones PHP moderno, escrito en Go"
sidebar:
  label: "Introducción"
seo:
  description: "FrankenPHP es un servidor de aplicaciones moderno para PHP construido sobre el servidor web Caddy."
---
FrankenPHP es un servidor de aplicaciones moderno para PHP construido sobre el servidor web [Caddy](https://caddyserver.com/).

FrankenPHP otorga superpoderes a tus aplicaciones PHP gracias a sus características de vanguardia: [_Early Hints_](/docs/early-hints), [modo worker](/docs/worker), [funcionalidades en tiempo real](/docs/mercure), HTTPS automático, soporte para HTTP/2 y HTTP/3...

FrankenPHP funciona con cualquier aplicación PHP y hace que tus proyectos Laravel y Symfony sean más rápidos que nunca gracias a sus integraciones oficiales con el modo worker.

FrankenPHP también puede usarse como una biblioteca Go autónoma que permite integrar PHP en cualquier aplicación usando `net/http`.

Descubre más detalles sobre este servidor de aplicaciones en la grabación de esta conferencia dada en el Forum PHP 2022:

<a href="https://dunglas.dev/2022/10/frankenphp-the-modern-php-app-server-written-in-go/"><img src="https://dunglas.dev/wp-content/uploads/2022/10/frankenphp.png" alt="Diapositivas" width="600"></a>

## Para comenzar

En Windows, usa [WSL](https://learn.microsoft.com/es-es/windows/wsl/) para ejecutar FrankenPHP.

### Script de instalación

Puedes copiar esta línea en tu terminal para instalar automáticamente
una versión adaptada a tu plataforma:

```console
curl https://frankenphp.dev/install.sh | sh
```

### Binario autónomo

Proporcionamos binarios estáticos de FrankenPHP para desarrollo, para Linux y macOS,
conteniendo [PHP 8.4](https://www.php.net/releases/8.4/es.php) y la mayoría de las extensiones PHP populares.

[Descargar FrankenPHP](https://github.com/php/frankenphp/releases)

**Instalación de extensiones:** Las extensiones más comunes están incluidas. No es posible instalar más.

### Paquetes rpm

Nuestros mantenedores proponen paquetes rpm para todos los sistemas que usan `dnf`. Para instalar, ejecuta:

```console
sudo dnf install https://rpm.henderkes.com/static-php-1-0.noarch.rpm
sudo dnf module enable php-zts:static-8.4 # 8.2-8.5 disponibles
sudo dnf install frankenphp
```

**Instalación de extensiones:** `sudo dnf install php-zts-<extension>`

Para extensiones no disponibles por defecto, usa [PIE](https://github.com/php/pie):

```console
sudo dnf install pie-zts
sudo pie-zts install asgrim/example-pie-extension
```

### Paquetes deb

Nuestros mantenedores proponen paquetes deb para todos los sistemas que usan `apt`. Para instalar, ejecuta:

```console
sudo curl -fsSL https://key.henderkes.com/static-php.gpg -o /usr/share/keyrings/static-php.gpg && \
echo "deb [signed-by=/usr/share/keyrings/static-php.gpg] https://deb.henderkes.com/ stable main" | sudo tee /etc/apt/sources.list.d/static-php.list && \
sudo apt update
sudo apt install frankenphp
```

**Instalación de extensiones:** `sudo apt install php-zts-<extension>`

Para extensiones no disponibles por defecto, usa [PIE](https://github.com/php/pie):

```console
sudo apt install pie-zts
sudo pie-zts install asgrim/example-pie-extension
```

### Docker

Las [imágenes Docker](/docs/docker) también están disponibles:

```console
docker run -v .:/app/public \
    -p 80:80 -p 443:443 -p 443:443/udp \
    dunglas/frankenphp
```

Ve a `https://localhost`, ¡listo!

<div class="fp-callout" data-callout="tip">
<p class="fp-callout-title">Consejo</p>

No intentes usar `https://127.0.0.1`. Usa `https://localhost` y acepta el certificado auto-firmado.
Usa [la variable de entorno `SERVER_NAME`](/docs/config#variables-de-entorno) para cambiar el dominio a usar.

</div>

### Homebrew

FrankenPHP también está disponible como paquete [Homebrew](https://brew.sh) para macOS y Linux.

Para instalarlo:

```console
brew install dunglas/frankenphp/frankenphp
```

**Instalación de extensiones:** Usa [PIE](https://github.com/php/pie).

### Uso

Para servir el contenido del directorio actual, ejecuta:

```console
frankenphp php-server
```

También puedes ejecutar scripts en línea de comandos con:

```console
frankenphp php-cli /ruta/a/tu/script.php
```

Para los paquetes deb y rpm, también puedes iniciar el servicio systemd:

```console
sudo systemctl start frankenphp
```

## Documentación

- [El modo clásico](/docs/classic)
- [El modo worker](/docs/worker)
- [Soporte para Early Hints (código de estado HTTP 103)](/docs/early-hints)
- [Tiempo real](/docs/mercure)
- [Hot reloading](/docs/hot-reload)
- [Registro de actividad](/docs/logging)
- [Servir eficientemente archivos estáticos grandes](/docs/x-sendfile)
- [Configuración](/docs/config)
- [Escribir extensiones PHP en Go](/docs/extensions)
- [Imágenes Docker](/docs/docker)
- [Despliegue en producción](/docs/production)
- [Optimización del rendimiento](/docs/performance)
- [Crear aplicaciones PHP **autónomas**, auto-ejecutables](/docs/embed)
- [Crear una compilación estática](/docs/static)
- [Compilar desde las fuentes](/docs/compile)
- [Monitoreo de FrankenPHP](/docs/metrics)
- [Integración con WordPress](/docs/wordpress)
- [Integración con Laravel](/docs/laravel)
- [Problemas conocidos](/docs/known-issues)
- [Aplicación de demostración (Symfony) y benchmarks](https://github.com/dunglas/frankenphp-demo)
- [Documentación de la biblioteca Go](https://pkg.go.dev/github.com/dunglas/frankenphp)
- [Contribuir y depurar](/docs/contributing)

## Ejemplos y esqueletos

- [Symfony](https://github.com/dunglas/symfony-docker)
- [API Platform](https://api-platform.com/docs/distribution/)
- [Laravel](/docs/laravel)
- [Sulu](https://sulu.io/blog/running-sulu-with-frankenphp)
- [WordPress](https://github.com/StephenMiracle/frankenwp)
- [Drupal](https://github.com/dunglas/frankenphp-drupal)
- [Joomla](https://github.com/alexandreelise/frankenphp-joomla)
- [TYPO3](https://github.com/ochorocho/franken-typo3)
- [Magento2](https://github.com/ekino/frankenphp-magento2)
