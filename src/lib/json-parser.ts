interface parseResult {
  ast: object | null
  e: Error | null
}

const formatJSON = (txt: string): parseResult => {
  let ast = {}
  try {
    ast = JSON.parse(txt)
    return { ast, e: null }
  } catch (e) {
    return { ast: null, e }
  }
}

export default formatJSON
