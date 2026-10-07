# PV GYM: de estos archivos a tu Play Store

Esta carpeta es la app completa. Funciona sin claude.ai, guarda los datos en tu teléfono y trae precargadas tus 9 evaluaciones de 5Componentes.

## Qué hay en la carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app |
| `manifest.webmanifest` | Nombre, colores e íconos para que Android la trate como app |
| `sw.js` | Permite abrirla sin internet |
| `icons/` | Íconos en todos los tamaños, más el gráfico destacado de 1024×500 para la ficha de Play Store |
| `.well-known/assetlinks.json` | Vínculo entre tu sitio y tu app de Android (se completa en el paso 4) |
| `.nojekyll` | Evita que GitHub Pages ignore la carpeta `.well-known` |

## Paso 1. Publicar la app en internet (gratis, con GitHub Pages)

1. Crea una cuenta en github.com si no tienes.
2. Crea un repositorio público llamado exactamente `TUUSUARIO.github.io` (reemplaza TUUSUARIO por tu usuario). Ese nombre hace que la app quede en la raíz del dominio, algo que Android necesita en el paso 4.
3. Sube todo el contenido de esta carpeta (no la carpeta en sí, su contenido). Revisa que aparezcan `.well-known/assetlinks.json` y `.nojekyll`: algunos computadores no arrastran archivos que empiezan con punto. Si faltan, créalos con **Add file → Create new file** escribiendo la ruta completa.
4. En **Settings → Pages**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
5. En uno o dos minutos la app estará en `https://TUUSUARIO.github.io`.

Prueba rápida: ábrela en Chrome en tu teléfono, menú ⋮ → **Instalar app**. Con eso ya tienes PV GYM con su ícono en la pantalla de inicio, sin pasar por Play Store.

## Paso 2. Generar el paquete para Android (PWABuilder)

1. Entra a pwabuilder.com, pega `https://TUUSUARIO.github.io` y presiona **Start**.
2. Elige **Package for stores → Android → Google Play**.
3. Usa como Package ID algo como `io.github.tuusuario.pvgym` y como nombre `PV GYM`.
4. Descarga el zip. Trae el archivo `.aab` (lo que se sube a Play Store), un `assetlinks.json` y la **llave de firma con sus contraseñas**.

> Guarda la llave de firma y sus contraseñas en un lugar seguro. Sin ellas no podrás publicar actualizaciones de la app.

## Paso 3. Crear la app en Google Play Console

1. Crea tu cuenta de desarrollador en play.google.com/console (pago único de USD 25 y verificación de identidad).
2. **Crear app** → nombre `PV GYM`, tipo app, gratuita.
3. Ve a **Pruebas → Pruebas internas** → crear versión → sube el `.aab`.
4. En la pestaña de testers, agrega tu correo de Gmail y guarda.
5. Copia el enlace de participación, ábrelo en tu teléfono, acepta y presiona **Descargar en Google Play**.

Las pruebas internas no exigen la prueba cerrada de 12 personas por 14 días; esa solo aplica si después quieres publicarla abierta para todos.

Play Console te pedirá algunas declaraciones (seguridad de los datos, clasificación de contenido, público objetivo). La app no envía datos a ningún servidor: todo queda en el teléfono.

## Paso 4. Quitar la barra del navegador

Si al abrir la app ves arriba una barra con la dirección web, falta completar el vínculo:

1. Reemplaza el contenido de `.well-known/assetlinks.json` en GitHub por el que vino en el zip de PWABuilder.
2. En Play Console, ve a **Prueba y lanzamiento → Configuración → Integridad de la app → Firma de apps** y copia la huella **SHA-256** de la llave de firma de apps.
3. Agrega esa huella dentro de `sha256_cert_fingerprints` en el mismo `assetlinks.json` (separada por coma de la que ya está).

Puede tardar algunas horas en tomar efecto.

## Ficha de la tienda

- Ícono: `icons/icon-512.png`
- Gráfico destacado: `icons/feature-graphic-1024x500.png`
- Capturas: toma 2 o más pantallazos de la app en tu teléfono.

## Tus datos

- Viven solo en el teléfono donde usas la app.
- En **Historial → Ajustes** puedes **Descargar respaldo** (archivo `.json`) y **Restaurar respaldo**. Hazlo antes de cambiar de teléfono o desinstalar.
- Si instalas desde el sitio web y también desde Play Store, cada una tiene sus propios datos: usa el respaldo para pasarlos de una a otra.

## Actualizar la app

Cambia `index.html` en GitHub y la app se actualiza sola la próxima vez que la abras con internet. Solo necesitas un `.aab` nuevo si cambias el nombre, el ícono o el Package ID.
