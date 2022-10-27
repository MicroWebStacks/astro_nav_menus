# astro big doc

Live demo : https://microwebstacks.github.io/astro-big-doc/

Early stage deno deployment : https://astro-nav-menus.deno.dev/

Astro Theme that can scale for big documentation websites. Includes an unimited depth config menu that starts with a top appbar for sections navigation, then continues on a tree left  menu for pages. Each page then has a tree right menu for its table of content.

User friendly even for large menus as both left and right ones are collapsible and width adjustable by the user.

Performance oriented, using astro components only, no css extenal framework, no virtual dom. Focus on static generation on build time, no client side rendering. Javascript is for minial manipulations connecting events and classes.
## Features
- astro components (.astro) html css js
- article page full content as html ready for browser search
- Left Menu pages Tree Navigation
- Right Menu Table of Content
- Menus consist of Trees with unlimited depth and recursively expandable sections
- Menus can be opened, collapsed and width adjusted by the user
- Menus are built by astro and seen as readable html hierarchy by the client
- Navigation menu can have pages or directories similar to file system browsing experience
- markdown 
  - Supports md and mdx
  - Automatic Right Menu ToC generation for all markdown pages
  - Markdown pages can be either in `scr/pages` or on any other server local path e.g. `data/blog` or `../../content/markdown`
  - Plantuml with dynamic and static Svg in MD, Astro component in MDX

# Dev
## getting started
```
pnpm install
pnpm run dev
pnpm run build
```
## creation
This project was created as follows
```
pnpm create astro@latest
```
 - Name, Empty Project, No Typescript
 - move to root git repo
 - delete node_modules
 - add deno and server config to `astro.config.mjs`
 - prepare `.github/workflows/deploy.yml`

## plantuml SVG
* `remark-plantuml-object` : Dynamic, the client needs to wait for svg generation when the page is loaded. The plugin only replace plantuml code with html `object` tag pointing on server with encoded text in url.
* `remark-plantuml-svg` : Static, svg generated on build time. The plugin extracts plantuml code, place it on extrnal `.puml` file for vs code preview convenience and convert it to `.svg` on build time. The puml and svg files are cached and only regenerated on new builds if the md file has been changed.
* `remark-plantuml-astro` : Same as svg, adds an Astro component with top right button to open svg in modal

## Todos
- panzoom component
  - start Dynamic Modal
- Markdown
  - pass MD as MDX
  - Enhance headings with Astro component, hover highlight and icons for id slugs
- Issue : node not serving files
- gallery
- authentication
  - AppBar right float icons
  - ssr mode signin with github
- menus
  - Structure : generation of left nav menu from src/pages
  - Structure : Update menu from getStaticPatsh() [slug] for a hierarchy of files
  - pages types and icons
  - open close on nav-resize click
  - menu auto depth adjust 
  - current page depth always open
  - all level items or nothing
  - depth slider or depth selector
  - Issue: Menu height transition MUI example is working
  - (optional) store nav menu width / prevent reset on same page reload

## Hints
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
- node js modules filename not in `__filename` but in `import.meta.url`
- `<Content components={{}}/>` only replaces html items injected from plugins and not items written in markdown page
- `<Content components={{}}/>` does not replace Astro components in MD, only in MDX

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
