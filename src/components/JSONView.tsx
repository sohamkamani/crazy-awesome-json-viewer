import * as React from 'react'
import Collapsebutton from './CollapseButton'
import { LevelCtx, OptionsCtx } from '../contexts'
import { vestigial, wrapInQuotes, jsonNumber, literal, key } from '../lib/primitives'

import './color-theme.css'

const wrapInQuotesIfString = (val) => {
  if (typeof val.value === 'string') return wrapInQuotes(val.value)
  if (typeof val.value === 'number') return jsonNumber(val.raw)
  return literal(val.raw)
}

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

const JSONLiteral = ({ val, objectKeyName, shouldShowComma }) => (
  <div className='json-element'>
    {key(objectKeyName)}
    {wrapInQuotesIfString(val)}
    {shouldShowComma ? vestigial(',') : null}
  </div>
)

class JSONStructure {
  isArray: boolean
  objectKeyName: string
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
    const { nodes, objectKeyName, isArray, shouldShowComma } = this.props
    const { collapsed } = this.state
    const collapseButton = <Collapsebutton collapsed={collapsed} onClick={this.collapse.bind(this)} />
    const { op, cl } = brackets(isArray, shouldShowComma ? ',' : '')
    return (
      <LevelCtx.Consumer>
        {(level) => (
          <div className='json-element'>
            {key(objectKeyName)}
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
                  level={level + 1}
                />
              ))}
            </div>
            {cl}
          </div>
        )}
      </LevelCtx.Consumer>
    )
  }
}

const getAstView = ({ ast, objectKey, shouldShowComma }) => {
  let isArray = true
  switch (ast.type) {
    case 'Object':
      isArray = false
    case 'Array':
      if (isArray) console.log(ast)
      return (
        <JSONObject
          shouldShowComma={shouldShowComma}
          objectKeyName={objectKey}
          nodes={ast.children}
          isArray={isArray}
        />
      )
    case 'Literal':
      return <JSONLiteral shouldShowComma={shouldShowComma} objectKeyName={objectKey} val={ast} />
    default:
      return <div>Later</div>
  }
}

const fontSizeMap = {
  small: '10px',
  medium: '14px',
  large: '18px'
}

const JSONView = ({ ast, objectKey, shouldShowComma, level = 0 }) => {
  if (ast instanceof Error && ast.name === 'SyntaxError') {
    return <pre className='json-element'>{ast.message}</pre>
  }

  const astView = getAstView({ ast, objectKey, shouldShowComma })
  return (
    <OptionsCtx.Consumer>
      {(options) => (
        <LevelCtx.Provider value={level}>
          <div style={{ fontSize: fontSizeMap[options.textSize] }}>{astView}</div>
        </LevelCtx.Provider>
      )}
    </OptionsCtx.Consumer>
  )
}
export default JSONView
