import parse from 'json-to-ast'

const formatJSON = (txt: string): Object => {
  let ast = {}
  try {
    ast = parse(txt, { loc: false })
    return ast
  } catch (e) {
    return e
  }
}

export default formatJSON
