import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPlantUML} from './src/libs/remark-object-plantuml'

export default defineConfig({
  output: "static",
  site: 'http://localhost',
  base: '',
  trailingSlash: 'ignore',
  markdown:{
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'shiki',
    remarkPlugins:[
      [remarkPlantUML,{ baseUrl: "https://www.plantuml.com/plantuml/svg" }]
    ]
  },
  integrations: [mdx()]
});
