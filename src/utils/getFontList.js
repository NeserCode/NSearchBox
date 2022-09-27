import { getFonts } from "font-list";

export const $Fonts = getFonts().then(fonts => {
  const replacedFontLst = []
  fonts.map(item => {
    replacedFontLst.push(item.indexOf('"') === 0 ? item.replace(/^"|"$/g, '') : item)
  })

  return replacedFontLst
})