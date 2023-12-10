# astro big doc

Live demo : https://astro-big-doc.netlify.app

Astro Theme for big documentation websites. Hierarchical pages menu from files structure and table of content, Markdown rendered as CMS with Astro components for panzoom, 3D, links, interactive tables, diagrams from code, VSCode like highlighter.

Enhances native markdown '.md' files with Astro components, enables parsing of content from a configurable directory in the file system, and allows relative assets paths usage.

User friendly side menus collapsible and width adjustable with the mouse.

## Features list
- enhance images with panzoom function
- image directive for images size defintion in markdown
- use relative assets in markdown
- Active data tables with [DataTables](https://datatables.net/)
  - from Markdown table
  - from xlsx file link
- 3D Model viewer
  - from .glb link
  - from yaml parameters
- external links identification and rendering with an arrow
- VSCode like highlighting using [Shikiji](https://github.com/antfu/shikiji)

# Usage
```
pnpm install
pnpm run dev
pnpm run build
```
## .env config
This project uses environment variables as unified config to astro.config.mjs and to the express server. The environment variabels are also loaded by a `config.js` to allow their usage from any file in astro including .js

It is possible to build with zero config, the default mode is 'STATIC' See also an example in [.env.example](.env.example).

Astro variables
* `OUT_DIR` : directory where the build will be genrated
* `PORT` : maps to astro.config.mjs [server.port](https://docs.astro.build/en/reference/configuration-reference/#serverport)

Express general variables
* `PROTOCOL` : either of htp or https for express server usage
* `CERT_FILE` : required when https is used
* `KEY_FILE` : required when https is used

Express authentication variables
* `HOST` : Express passport callbackURL
* `PORT` : Express passport callbackURL
* `GITHUB_CLIENT_ID`      : Express passport Github strategy configuration
* `GITHUB_CLIENT_SECRET`  : Express passport Github strategy configuration
* `SESSION_SECRET`        : used by 'express-session' handler

## authentication doc
- Github OAuth : https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
- express-session : 
  - repo https://github.com/expressjs/session
  - doc https://expressjs.com/en/resources/middleware/session.html
- passport OAuth doc : http://www.passportjs.org/concepts/authentication/oauth/
- passport-github : https://github.com/jaredhanson/passport-github
- passport-github doc : http://www.passportjs.org/packages/passport-github/
- passport example : https://github.com/passport/todos-express-facebook/blob/master/app.js
- jwo example : https://gist.github.com/jwo/ea79620b5229e7821e4ae61055899cf9

- using self signed keys with `server/create.sh` result in browser warning 'your connection is not private' (NET::ERR_CERT_AUTHORITY_INVALID)
- for 'Let's Encrypt' certificates, ownership has to be proven by visibility of the host from the public internet which makes it not usable for internal domains and local network hosts

## plantuml SVG plugins
* `remark-plantuml-object` : Dynamic, the client needs to wait for svg generation when the page is loaded. The plugin only replace plantuml code with html `object` tag pointing on server with encoded text in url.
* `remark-plantuml-svg` : Static, svg generated on build time. The plugin extracts plantuml code, place it on extrnal `.puml` file for vs code preview convenience and convert it to `.svg` on build time. The puml and svg files are cached and only regenerated on new builds if the md file has been changed.
* `remark-plantuml-astro` : Same as svg, adds an Astro component with top right button to open svg in modal

# Plan
- light and dark mode toggle
- check potential replacement of scrollspy with intersection Observer API
- sync with Astro utilities for url resolution and astro image integration
## ideas
- menus
  - store menu scroll position
  - store menus width
  - use view transition to give menu persistence impression on page navigation
- content Structure
  - parse yaml tags and orgnaize menu with tags order hierarchy
- caching
  - SSR render on page hash condition, using ETag
  - page hash with depndencies hashes, include assets hash as attribute
## more ideas
- use declarative shadow dom to be able to retrieve data from it and reuse it
- Markdown
  - add more code formats, e.g. mermaid, D2, ...
- menus
  - ToC auto-expand : open scroll spy, close all others
  - Left and right : min (disabled) or expand to level slider or selector
  - Left and right : auto expand depth adjust to available vertical space (all level or nothing)
  - Structure : generation of left nav menu from src/pages
  - Structure : Update menu from getStaticPatsh() [slug] for a hierarchy of files
  - pages types and icons
  - open close on nav-resize click
  - Issue: Menu height transition MUI example is working
  - minor issue : Expand arrow rotates for nothing on page reload

## issues
- trailingSlash does not identify page when availabe e.g. `blog/gallery/` does not activate the page menu entry

## Hints
- SVGs
  - missing viewbox canot be resized
  - should not have `preserveAspectRatio="none"`
- menu config allows index pages but do not use them to keep consistent nav menu of folders/items
- adding interactive SVGs that can be styled with css is challenging
  - `svg.astro` uses the innerHTML fragment which breaks visibility of `style` tag no longer scoping imported SVG
  - import of `rightarrow.astro` still requires style to be either global or inline
  - Tree menu collapse transition :
    - display block/none does not animate the height
    - scaleY does not bring the height down to 0 due to remaining padding margin
    - height can be animated but must be set initially
    - max-height can be animated but must be set to max value which breaks the transition timing
    - max-height adjusting with js requires high complexity depending on state of expanded children hierarchy
    - clip also needs defined start stop
    - flex can also animate but then the flex container height must be set explicitely

# References
* https://github.com/syntax-tree/mdast
* https://github.com/syntax-tree/mdast#code
* https://github.com/syntax-tree/mdast#html
* https://github.com/remarkjs/remark/blob/main/doc/plugins.md
* https://github.com/syntax-tree/unist-util-visit
* https://github.com/akebifiky/remark-simple-plantuml

## astro docs
https://github.com/withastro/astro/tree/main/examples/docs

Advantages :

Official example, clean html structure, light and dark toggle, left side pages and right side Table Of Content.

Limitations :
 - react and preact dependencies, despite island architecture this can exclude potential use cases
 - Left Menu
   - handcoded `SIDEBAR` in `config.ts`
   - first level is map and not list so relying on ordered map
   - fixed 2 levels structure
 - ToC is dynamically parsing the DOM on client side, this reduces astro's advantage of zero js and server side generation and rendering
 - ToC does not take h1 and limited down to h4

## hello astro

https://github.com/hellotham/hello-astro

built upon astro-docs with differences :
 
 - advantage : right side ToC is not DOM client side like astro-docs but built with native astro component taking the `headings` Markdown Layout Prop https://docs.astro.build/en/guides/markdown-content/#markdown-layout-props

 - limitation: all svg integrations are either hardcoded or wrapped in images through svgimg

# License
- MIT
## images
- https://www.svgrepo.com/svg/19947/folders
- https://www.svgrepo.com/svg/400563/openfilefolder
- https://freesvg.org/1542512156 : tree
- https://www.svgrepo.com/svg/75085/full-screen
- https://uxwing.com/text-file-icon/
