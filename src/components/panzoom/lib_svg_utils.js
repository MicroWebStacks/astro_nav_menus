function svg_fix_size(svg){
    if (svg) {
      // Check if 'width' and 'height' attributes are missing
      if (!svg.hasAttribute('width') || !svg.hasAttribute('height')) {
        const viewBox = svg.getAttribute('viewBox');
        if (viewBox) {
          const sizes = viewBox.split(' ');
          // Typically, the viewBox is "minX minY width height"
          const width = sizes[2];
          const height = sizes[3];
  
          svg.setAttribute('width', width);
          svg.setAttribute('height', height);
          console.log("fixed SVG width and heigh")
        }else{
          console.log("no viewBox")
        }
      }
    }else{
      console.log("failed to fix svg size as svg is invalid")
    }
}
 
async function svg_add_links(svg,link_list){
    const SVGjsModule = await import('@svgdotjs/svg.js');
    const SVGjs = SVGjsModule.SVG;
    let added_links = false
    let draw = SVGjs(svg)
    let text_nodes = draw.find('text')
    let text_array = [ ...text_nodes ];
    text_array.forEach((text)=>{
      const html_text = text.node.innerHTML
      link_list.forEach((entry)=>{
        if(html_text == entry.label){
          var isAbs = new RegExp('^(?:[a-z+]+:)?//', 'i');//isAbsolute https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
          if(isAbs.test(entry.link)){
            text.linkTo((link)=>{link.to(entry.link).target('_blank')})//link in new page
          }else{
            text.linkTo((link)=>{link.to(entry.link).target('_top')})//link outside the shadow DOM
          }
          text.css({'text-decoration': 'underline'})  
          //text.fill('#f06')
          added_links = true
        }
      })
    })
    if(added_links){
      console.log("added links")
    }
}

async function svg_text_focus(svg,text){
    console.log(`SVG> focus on '${text}'`)
}

export{
    svg_fix_size,
    svg_add_links,
    svg_text_focus
}
