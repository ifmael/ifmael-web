const pages = require('./src/config/pages-node')

exports.onCreatePage = ({ page, actions }) =>{
  const { createPage, deletePage } = actions;
  const { internalComponentName } = page

  const pageConfig = pages.find(p => p.component === internalComponentName)

  if( pageConfig ){
    const i18Config = (locale, path) => ({
      context:{ locale },
      path
    })

    const i18En = { ...page, ...i18Config('en', pageConfig.en) }
    const i18Es = { ...page, ...i18Config('es', pageConfig.es) }
  
    deletePage(page);
    createPage(i18En)
    createPage(i18Es)
  } else{
    deletePage(page)
  } 

}
