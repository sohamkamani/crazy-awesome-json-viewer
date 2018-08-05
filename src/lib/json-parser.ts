const formatJSON = (txt: string): Object => {
  let ast = {}
  try {
    ast = JSON.parse(txt)
    return ast
  } catch (e) {
    return e
  }
}

export default formatJSON
