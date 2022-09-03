---
title:  "How to Optimize your websites images for Pagespeed"
description: Learn how to optimize website images by using webp formats, media queries, and serving multiple resolutions.
keywords: [html, css, pagespeed, webp, media-queries, how-to, modernizr]
slug: how-to-optimize-your-websites-images-for-pagespeed
categories: Front End
tags: [web, html, css, pagespeed, images, how-to]
authors: mistermunchkin
---

I will go through some things you can do to your images to get a pagespeed score of 90-100 for both mobile and desktop. 

:::note [imagekit.io](https://imagekit.io)
If you have the 💰💰💰, you can use a cloud service like [imagekit.io](https://imagekit.io) and let them handle your image and video optimizations. This blog is mainly for people who don't have deep pockets.
:::

## Responsive Web Design
Having a responsive web design means it should be optimized for all kinds of device screens! Be it a 5 inch mobile phone to a 34 inch ultrawide.

You can use a bunch of different CSS tricks for setting up a flexible layout for your texts, but for images you can use **Media Queries**.

## Prepare different image sizes and formats
A lot of young developers think that resizing an image using css would be sufficient in saving space. It is not. The full resolution image would still need to get "served" from the server your website is hosted at and then make it to your users browsers. So to actually save space, we would need to prepare different resolution images and formats. I compiled a list of websites I used to compress my image, change image resolution, and change image formats, preferrably you have a **jpeg** version, and a **webp/avif** version.

- [tinypng](https://tinypng.com) For compressing different kinds of image formats
- [convertio](https://convertio.co/image-converter/) For converting images.
- [adobe express](https://www.adobe.com/express/feature/image/resize) For resizing images.

You can use whatever site you want to use but these are just the sites that I liked using the most.

## Media Queries
media queries allow us to add CSS rules if a certain condition is true. So one thing we can do would be to set the **max-width** and **min-width** for the query so it targets a general screen size.

This is effective for when we want to serve different image resolutions so we can save on the total size of our website.

The example below uses the syntax **x1, x2, x3** to serve different resolution images. Respectively **1500px, 2500px, and 4800px**.

### Monitor Screens and Tablets
x1 would be the served to devices with a width below 1200px;
```css title='Version 1 Media Query'
@media screen
    and (min-device-width: 800px)
    and (max-device-width: 1200px) {

    .hero-background {
        background-image: url(/quantum-cleaning-assets/img/hero/hero-full-image-x1.jpeg);
    }

    .hero-banner {
        background-image: url(/quantum-cleaning-assets/img/hero-banner/hero-banner-image-x1.jpg);
    }
}
```

x2 would be served to devices with a width below 1600px and above 1200px
```css title='Version 2 Media Query'
@media screen 
    and (min-device-width: 1200px)
    and (max-device-width: 1600px) {

    .hero-background {
	    background-image: url(/quantum-cleaning-assets/img/hero/hero-full-image-x2.jpeg);
    }

    .hero-banner {
        background-image: url(/quantum-cleaning-assets/img/hero-banner/hero-banner-image-x2.jpg);
    }
}
```
3x would be served to devices with a width below 1600px and above 1200px
```css title='Version 3 Media Query'
@media screen
    and (min-device-width: 1600px){

    .hero-background {
        background-image: url(/quantum-cleaning-assets/img/hero/hero-full-image-x3.jpeg);
    }

    .hero-banner {
        background-image: url(/quantum-cleaning-assets/img/hero-banner/hero-banner-image-x3.jpg);
    }
}
```
### Mobile Devices
For mobile, I just made use of one picture which had a resolution of 800px by 1200px. This should cover most mobile screens.
```css title='Mobile Device Media Query'
@media screen
    and (max-device-width: 800px) {

    .hero-background {
        background-image: url(/quantum-cleaning-assets/img/hero/hero-full-image-mobile.jpeg);
    }

    .hero-banner {
        background-image: url(/quantum-cleaning-assets/img/hero-banner/hero-banner-image-mobile.jpg);
    }
}
```

## monderizr-webp.js
[modernizr](https://modernizr.com) have really great tools not just for webp, but for a host of different things for Javascript and CSS. 

You can go to their modernizr download page, and build the minified js you need: [modernizr download page](https://modernizr.com/download?webp-setclasses&q=webp) and then add it to your website. Basically modernizr-webp detects your users devices if it can support webp. If it can, then it will give the html body a webp class. If it doesn't, it gets a no-webp class.

We can then use this webp/nowebp class to serve different image formats in our media queries for different screen sizes in css.

```css title='Media Query with webp and nowebp classes'
/* Desktop Devices */
@media screen
    and (max-device-width: 1200px) {
    // highlight-next-line
    .no-webp .hero-background {
        background-image: url(/quantum-cleaning-assets/img/hero/hero-full-image-x1.jpeg);
    }
    // highlight-next-line
    .webp .hero-background {
        background-image: url(/quantum-cleaning-assets/img/hero/webp/hero-full-image-x1.webp);
    }
    // highlight-next-line
    .no-webp .hero-banner {
        background-image: url(/quantum-cleaning-assets/img/hero-banner/hero-banner-image-x1.jpg);
    }
    // highlight-next-line
    .webp .hero-banner {
        background-image: url(/quantum-cleaning-assets/img/hero-banner/webp/hero-banner-image-x1.webp);
    }
}
```

## SVG
As much as possible, it's always better to serve SVGs, They resize on their own and they aren't heavy like JPEGs, PNGs or... GIFs 🤮. If ever you have graphics for your website, serve them as SVGs instead.

## `<picture>` element
You can also serve your images in html inside a [Mozilla picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture).

> The `<picture>` HTML element contains zero or more `<source>` elements and one `<img>` element to offer alternative versions of an image for different display/device scenarios. The browser will consider each child `<source>` element and choose the best match among them. If no matches are found—or the browser doesn't support the `<picture>` element—the URL of the `<img>` element's src attribute is selected. The selected image is then presented in the space occupied by the `<img>` element. - Mozilla

```markup title='<picture> element demo'
<picture>
    <source srcset="/media/cc0-images/surfer-240-200.jpg"
            media="(min-width: 800px)">
    <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="" />
</picture>

```

This way, you have the choice of either setting up your pictures in HTML or in CSS.

## Closing Thoughts
I don't really have any closing thoughts, but I like adding closing thoughts to my blogs because it feels like a good way to say goodbye... and if you could [buy me a ☕️](https://www.paypal.com/donate/?hosted_button_id=B9HDECYJ4CEF8) that'd be great. Thanks!