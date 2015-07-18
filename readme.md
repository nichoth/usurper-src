## images from instagram

Use client side JS to download the images from twitter. Pre-fetch them, then use sw or indexeddb to cache them. Need to check for updates every time, could be complicated &mdash on page load need to make req to instagram, if there are new updates insert them in idb keyed on date, render the page with the latest ~20 images.

Ideally server would include a bootstrap in the initial request that tells us if there are updates to the image feed &mdash; server could send hash of latest image.

## todo

* everything on one page
* scroll situation – make link that scrolls down
* no phone number
* minify everything
* bg image resolution
* media queries
* vertical ratio bg image

## launch
* google analytics
* sitemap, webmaster tools
