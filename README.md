# Liz Gorman Art Photography

## Overview

A photography portfolio website. The site is split into two sections, *commercial* and *art*, both of which feature a showcase menu and individual gallery pages with photo sliders for each project of the business . 


## Technologies used

The following technologies were used in this project:

- Gatsby.js

- 
## Usage guide

Either navigate to the [live demo](https://www.lizgormanphotography.co.uk/) or clone this repo to run the project locally.

## Build process

### Consultation

After an initial consultation with the client regarding the page structure and overall aesthetic of the site, I was given fairly free reign with regards to the design of the site - a black and white/greyscale colour scheme was requested and prominent positioning of the photographs was agreed to be optimal.

The site can be split into three general pages - The index/welcome page, the section menu pages (art/commection) pages and the individual project category pages (e.g. dance, portraits etc) . The pages were created in this order and checked by the client before moving on to the next section with only minor adjustments made subsequently. 


### Build

I created mockups of the pages using Figma and used them to guide me through the build process. I mistakenly adopted this approach halfway through the project and wasted a lot of time reworking code without a clear vision of the project and overall structure of the page. 

The project originally started as a pure JS/HTML site using webpack for image optimisation, favicons etc., however I later migrated the project (and rewrote significant portions of it) in order to benefit from the advantages of a Gatsby site 

- generally: all the normal advantages of Gatsby: fast, accessible, image optimisation etc.

- specifically: the flexibility afforded by gatsby-node.js and graphyQL which allow for easy building with templates and changing image folder contents.


### Tricky/interesting bits/features

#### Generating pages 

- Using gatsby-node.js to generate pages from markdown files (one per page to be generated).
- Populating templates with correct images from structured folders in the /images directory using GraphQL and custom filtering function.

#### Instagram

- Instagram plugin pulls in images from user profile.

## Future features

- CMS to allow for new images to be uploaded and text content (descriptions/abouts) to be changed. 
