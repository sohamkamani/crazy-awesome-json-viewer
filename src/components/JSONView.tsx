import * as React from 'react'
import Collapsebutton from './CollapseButton'

const JSONLiteral = ({ value, objectKey }) => (
  <div className='json-element'>
    {objectKey ? `"${objectKey}" :` : null}
    {value}
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

    return (
      <div className='json-element'>
        {objectKey ? `"${objectKey}" : ` : null}
        {isArray ? '[' : '{'}
        {collapseButton}
        {collapsed ? null : <br />}
        <div style={collapsed ? { display: 'none' } : {}}>
          {children.map((c) => <JSONView objectKey={isArray ? '' : c.key.value} ast={isArray ? c : c.value} />)}
        </div>
        {isArray ? ']' : '}'}
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
      return <JSONLiteral objectKey={objectKey} value={ast.raw} />
    default:
      return <div>Later</div>
  }
}
export default JSONView
