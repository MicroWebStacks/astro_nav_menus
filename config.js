//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import {join,dirname} from 'path'

const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
console.log(`__dirname = ${__dirname}`)
if(import.meta.env?.MODE == "production"){
	__dirname = join(__dirname,'../../..')
}

dotenv.config()

let protocol = process.env.PROTOCOL
let content_out = "dist"
if(import.meta.env.DEV){
    protocol = "http"
    content_out = "public"
}

const config = {
    port:process.env.PORT,
    url:`${protocol}://${process.env.HOST}:${process.env.PORT}`,
    rootdir: __dirname,
    outDir: "dist",
    content: "content",
    content_out: content_out,
    plantuml_server: "https://www.plantuml.com/plantuml/svg",
    kroki_server: "https://kroki.io",
    client_menu:true,
    hashed_assets:false,
    copy_astro:false,
    highlighter:{
        theme:"dark-plus",
        langs:['javascript','js','python','yaml']
    }
}

config.collect_content = {
    rootdir:config.rootdir,
    rel_contentdir:config.content,
    rel_outdir:"public",//because integrations cannot persist on dist before start of build
    raw_menu:"menu.yaml",
    debug:true,
    tags:{
        page:'page::([\\w-.]+)'
    }
}

console.log(config)

export {
    config
}
