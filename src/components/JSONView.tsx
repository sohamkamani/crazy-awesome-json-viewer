import * as React from 'react'
import Modal from 'antd/lib/modal'
import { CollapseButton, TableButton } from './SideButtons'
import { LevelCtx, OptionsCtx } from '../contexts'
import { vestigial, wrapInQuotes, jsonNumber, literal, key } from '../lib/primitives'
import { shouldShowTable, Tbl } from './TableView'

import 'antd/lib/modal/style/css'
import './color-theme.css'

const wrapInQuotesIfString = (val) => {
  if (typeof val === 'string') return wrapInQuotes(val)
  if (typeof val === 'number') return jsonNumber(String(val))
  return literal(String(val))
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
  showTable: boolean
  tableData: any[]
}

class JSONObject extends React.Component<JSONStructure, JSONStructureState> {
  public constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      showTable: false,
      tableData: []
    }
  }
  collapse () {
    this.setState({ collapsed: !this.state.collapsed })
  }
  tableView (nodes) {
    this.setState({ showTable: true, tableData: nodes })
  }
  hideTableView () {
    this.setState({ showTable: false })
  }
  public render () {
    const { nodes, objectKeyName, isArray, shouldShowComma } = this.props
    const { collapsed } = this.state
    const collapseButton = <CollapseButton collapsed={collapsed} onClick={this.collapse.bind(this)} />
    const tableButton =
      isArray && shouldShowTable(nodes) ? (
        <TableButton collapsed={collapsed} onClick={() => this.tableView.bind(this)(nodes)} />
      ) : null
    const { op, cl } = brackets(isArray, shouldShowComma ? ',' : '')
    const keys = Object.keys(nodes)
    return (
      <LevelCtx.Consumer>
        {(level) => (
          <div className='json-element'>
            {key(objectKeyName)}
            {op}
            {collapseButton}
            {tableButton}
            {collapsed ? null : <br />}
            <div style={collapsed ? { display: 'none' } : {}}>
              {keys.map((key, i) => (
                <JSONView
                  key={i}
                  shouldShowComma={i < keys.length - 1}
                  objectKey={isArray ? '' : key}
                  ast={nodes[key]}
                  level={level + 1}
                />
              ))}
            </div>
            {cl}
            <Modal title='Table View' visible={this.state.showTable} onCancel={this.hideTableView.bind(this)}>
              <Tbl data={this.state.tableData} />
            </Modal>
          </div>
        )}
      </LevelCtx.Consumer>
    )
  }
}

const getAstView = ({ ast, objectKey, shouldShowComma }) => {
  if (typeof ast === 'object' && ast !== null) {
    let isArray = false
    if (ast instanceof Array) {
      isArray = true
    }
    return <JSONObject shouldShowComma={shouldShowComma} objectKeyName={objectKey} nodes={ast} isArray={isArray} />
  }
  return <JSONLiteral shouldShowComma={shouldShowComma} objectKeyName={objectKey} val={ast} />
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
