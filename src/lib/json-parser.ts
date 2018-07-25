import parse from 'json-to-ast'

const formatJSON = (txt: string): Object => {
  let ast = {}
  try {
    ast = parse(txt)
  } catch (e) {
    console.log('cannot parse: ', e)
    return e
  } finally {
    return ast
  }
}

export default formatJSON
