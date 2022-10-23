import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPlantUML} from './src/libs/remark-plantuml-object'
import {remarkPUML} from './src/libs/remark-plantuml-svg'

export default defineConfig({
  output: "static",
  outDir: "./docs",
  site: 'http://microwebstacks.github.io',
  base: 'astro-big-doc',
  trailingSlash: 'ignore',
  markdown:{
    syntaxHighlight: 'shiki',
    remarkPlugins: [
      remarkPUML,
      remarkPlantUML,
    ],
    rehypePlugins: [],
    extendDefaultPlugins: true
  },
  integrations: [mdx()]
});
