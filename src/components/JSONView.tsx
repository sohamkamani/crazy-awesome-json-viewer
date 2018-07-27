import * as React from 'react'
import Collapsebutton from './CollapseButton'

import './color-theme.css'

const vestigial = (str: string): JSX.Element => <span className='json-vestigial'>{str}</span>

const wrapInQuotes = (objectKey: string): JSX.Element => (
  <span>
    <span className='json-vestigial'>"</span>
    <span className='json-string'>{objectKey}</span>
    <span className='json-vestigial'>"</span>
  </span>
)

const wrapInQuotesIfString = (val) => {
  if (typeof val.value === 'string') return wrapInQuotes(val.value)
  if (typeof val.value === 'number') return <span className='json-number'>{val.raw}</span>
  return <span className='json-literal'>{val.raw}</span>
}

const key = (objectKey: string): JSX.Element | null =>
  objectKey ? (
    <span className='json-key'>
      {wrapInQuotes(objectKey)}
      <span className='json-vestigial'> : </span>
    </span>
  ) : null

class Brackets {
  op: JSX.Element
  cl: JSX.Element
}

const brackets = (isArray: boolean, comma: string): Brackets =>
  isArray
    ? {
        op: vestigial('['),
        cl: vestigial(']' + comma)
      }
    : {
        op: vestigial('{'),
        cl: vestigial('}' + comma)
      }

const JSONLiteral = ({ val, objectKey, shouldShowComma }) => (
  <div className='json-element'>
    {key(objectKey)}
    {wrapInQuotesIfString(val)}
    {shouldShowComma ? vestigial(',') : null}
  </div>
)

class JSONStructure {
  isArray: boolean
  objectKey: string
  nodes: Array<any>
  shouldShowComma: boolean
}

class JSONStructureState {
  collapsed: boolean
}

class JSONObject extends React.Component<JSONStructure, JSONStructureState> {
  public constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  collapse () {
    this.setState({ collapsed: !this.state.collapsed })
  }
  public render () {
    const { nodes, objectKey, isArray, shouldShowComma } = this.props
    const { collapsed } = this.state
    const collapseButton = <Collapsebutton collapsed={collapsed} onClick={this.collapse.bind(this)} />
    const { op, cl } = brackets(isArray, shouldShowComma ? ',' : '')
    return (
      <div className='json-element'>
        {key(objectKey)}
        {op}
        {collapseButton}
        {collapsed ? null : <br />}
        <div style={collapsed ? { display: 'none' } : {}}>
          {nodes.map((c, i) => (
            <JSONView
              key={i}
              shouldShowComma={i < nodes.length - 1}
              objectKey={isArray ? '' : c.key.value}
              ast={isArray ? c : c.value}
            />
          ))}
        </div>
        {cl}
      </div>
    )
  }
}

const getAstView = (ast, objectKey, shouldShowComma) => {
  switch (ast.type) {
    case 'Object':
      return <JSONObject shouldShowComma={shouldShowComma} objectKey={objectKey} nodes={ast.children} isArray={false} />
    case 'Array':
      return <JSONObject shouldShowComma={shouldShowComma} objectKey={objectKey} nodes={ast.children} isArray />
    case 'Literal':
      return <JSONLiteral shouldShowComma={shouldShowComma} objectKey={objectKey} val={ast} />
    default:
      return <div>Later</div>
  }
}

const JSONView = ({ ast, objectKey, shouldShowComma }) => {
  if (ast instanceof Error && ast.name === 'SyntaxError') {
    return <div className='json-element'>{ast.message.split('\n').map((txt) => <div>{txt}</div>)}</div>
  }

  const astView = getAstView(ast, objectKey, shouldShowComma)
  return <div>{astView}</div>
}
export default JSONView
