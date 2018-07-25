import parse from 'json-to-ast'

const formatJSON = (txt: string): Object => {
  let ast = {}
  try {
    ast = parse(txt)
    return ast
  } catch (e) {
    console.log('cannot parse: ', e)
    return e
  }
}

export default formatJSON
