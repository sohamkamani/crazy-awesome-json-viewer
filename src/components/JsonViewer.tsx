import * as React from 'react'
import JSONView from './JSONView'

import formatJSON from '../lib/json-parser'

import Input from 'antd/lib/input'

import 'antd/lib/input/style/css'
import './json-viewer.css'

const sampleJSON = `{
  "title": "JSON viewer",
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
    this.state = { rawInput: sampleJSON }
  }

  onTextChange (e) {
    this.setState({ rawInput: e.target.value })
  }

  public render () {
    const state: any = this.state
    return (
      <div className='json-viewer'>
        <Input.TextArea className='json-viewer__input' value={state.rawInput} onChange={this.onTextChange.bind(this)} />
        <div className='json-viewer__view'>
          <JSONView ast={formatJSON(state.rawInput)} omitBeginning={false} />
        </div>
      </div>
    )
  }
}
