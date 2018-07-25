import * as React from 'react'

const JSONLiteral = ({ value }) => <span>{value}</span>

const JSONPropertyBeginning = (ast): string | null => {
  switch (ast.type) {
    case 'Object':
      return '{'
    case 'Array':
      return '['
    default:
      return null
  }
}

const JSONProperty = ({ k, v }) => (
  <div className='json-element json-property'>
    "{k.value}": {JSONPropertyBeginning(v)}
    <JSONView ast={v} omitBeginning={true} />
  </div>
)

const JSONObject = ({ children, omitBeginning }): JSX.Element => {
  return (
    <div className='json-element'>
      {omitBeginning ? null : '{'}
      {omitBeginning ? null : <br />}
      {children.map((c) => <JSONProperty k={c.key} v={c.value} />)}
      {'}'}
    </div>
  )
}

const JSONArray = ({ children, omitBeginning }): JSX.Element => {
  return (
    <div className='json-element'>
      {omitBeginning ? null : '['}
      {omitBeginning ? null : <br />}
      {children.map((c) => <JSONView ast={c} omitBeginning={false} />)}
      {']'}
    </div>
  )
}

const JSONView = ({ ast, omitBeginning }) => {
  switch (ast.type) {
    case 'Object':
      return <JSONObject children={ast.children} omitBeginning={omitBeginning} />
    case 'Array':
      return <JSONArray omitBeginning={omitBeginning} children={ast.children} />
    case 'Literal':
      return <JSONLiteral value={ast.raw} />
    default:
      return <div>Later</div>
  }
}
export default JSONView
