import * as React from 'react'
import Collapsebutton from './CollapseButton'

const vestigial = (str: string): JSX.Element => <span className='json-vestigial'>{str}</span>

const wrapInQuotes = (objectKey: string): JSX.Element => (
  <span>
    <span className='json-vestigial'>"</span>
    <span className='json-key'>{objectKey}</span>
    <span className='json-vestigial'>"</span>
  </span>
)

const wrapInQuotesIfString = (val) => (typeof val.value === 'string' ? wrapInQuotes(val.value) : val.raw)

const key = (objectKey: string): JSX.Element | null =>
  objectKey ? (
    <span>
      {wrapInQuotes(objectKey)}
      <span className='json-vestigial'> : </span>
    </span>
  ) : null

class Brackets {
  op: JSX.Element
  cl: JSX.Element
}

const brackets = (isArray: boolean): Brackets =>
  isArray
    ? {
        op: vestigial('['),
        cl: vestigial(']')
      }
    : {
        op: vestigial('{'),
        cl: vestigial('}')
      }

const JSONLiteral = ({ val, objectKey }) => (
  <div className='json-element'>
    {key(objectKey)}
    {wrapInQuotesIfString(val)}
  </div>
)

class JSONStructure {
  isArray: boolean
  objectKey: string
  children: Array<any>
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
    const { children, objectKey, isArray } = this.props
    const { collapsed } = this.state
    const collapseButton = <Collapsebutton collapsed={collapsed} onClick={this.collapse.bind(this)} />
    const { op, cl } = brackets(isArray)
    return (
      <div className='json-element'>
        {key(objectKey)}
        {op}
        {collapseButton}
        {collapsed ? null : <br />}
        <div style={collapsed ? { display: 'none' } : {}}>
          {children.map((c) => <JSONView objectKey={isArray ? '' : c.key.value} ast={isArray ? c : c.value} />)}
        </div>
        {cl}
      </div>
    )
  }
}

const JSONView = ({ ast, omitBeginning, objectKey }) => {
  if (ast instanceof Error && ast.name === 'SyntaxError') {
    return <div className='json-element'>{ast.message.split('\n').map((txt) => <div>{txt}</div>)}</div>
  }
  switch (ast.type) {
    case 'Object':
      return <JSONObject objectKey={objectKey} children={ast.children} isArray={false} />
    case 'Array':
      return <JSONObject objectKey={objectKey} children={ast.children} isArray />
    case 'Literal':
      return <JSONLiteral objectKey={objectKey} val={ast} />
    default:
      return <div>Later</div>
  }
}
export default JSONView
