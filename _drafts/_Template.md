---
layout: post
title: "Template"
subtitle: "du 21 au 27 avril 2015"
post_excerpt: "Le Péloponnèse est le berceau de la mythologie grecque mais également une belle nature."
date: '2016-01-01'
category: grece
cover: https://farm2.staticflickr.com/1481/24784249786_53e9528f62
tags:
  - test
  - intro
---

{% include components/toc.html %}

### Titre 3

#### Titre 4

**texte gras**

Paragraphe

Liste :

- item 1
- item 2
  - item 2.1
  - item 2.2
- item 3

(lien vers une autre page du site)[/photos]

#### Image

{% include image.html
  src='https://farm2.staticflickr.com/1624/24692687832_99824f674e'
  alt='Olympie - Fronton du Temple de Zeus - Péloponnèse'
%}

#### Vidéos

{% include video.html
  src='https://player.vimeo.com/video/154499514'
  alt='Voyage de noces chinois'
%}

#### Attachments

{% include file.html
  src='guide_balisage_rivieres.pdf'
  title='Guide de balisage des rivières 2'
  filetype='pdf'
%}



#### Notes

>**Transport**
>
>- **Ferry Pirée - Santorin** *Santorin : 38€ (8h)*
>
>**Hébergement**
>
>- **Auberge Caveland Santorin** *17€*
>
>**Divers**
>
>- **Location scooter** *15€/jour*
