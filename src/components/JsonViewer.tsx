import * as React from 'react'
import JSONView from './JSONView'

import formatJSON from '../lib/json-parser'

import Input from 'antd/lib/input'

import 'antd/lib/input/style/css'
import './json-viewer.css'

const sampleJSON = `{
  "title": "JSON viewer",
  "table view" : [{"a":1, "b":4},{"a":2, "b":1},{"a":5, "b":2}, {"a":1, "b":4, "c": [{"d":5}]}],
  "sample array":[1,2,3,4],
  "sample object": {
    "embedded array" : ["hey"],
    "key":"value",
    "null":null
  }
}`

export default class JsonViewer extends React.Component {
  public constructor (props) {
    super(props)
    const { ast, e } = formatJSON(sampleJSON)
    this.state = { rawInput: sampleJSON, ast, e }
  }

  onTextChange (event) {
    const { value } = event.target
    const { ast, e } = formatJSON(value)
    if (e) {
      this.setState({ rawInput: value, e })
      return
    }
    this.setState({ rawInput: value, ast, e: null })
  }

  public render () {
    const state: any = this.state
    return (
      <div className='json-viewer'>
        <Input.TextArea className='json-viewer__input' value={state.rawInput} onChange={this.onTextChange.bind(this)} />
        <div className='json-viewer__view'>
          <div style={{ paddingBottom: '15px' }}>
            {state.e ? (
              <div className='error-message-container'>
                <pre className='error-message'>{state.e.message}</pre>
              </div>
            ) : null}
            <JSONView ast={state.ast} omitBeginning={false} />
          </div>
        </div>
      </div>
    )
  }
}
