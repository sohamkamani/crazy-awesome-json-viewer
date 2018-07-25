import * as MediumEditor from 'medium-editor'
import * as React from 'react'
import JSONView from './JSONView'

import formatJSON from '../lib/json-parser'

import 'medium-editor/dist/css/medium-editor.css'
import './json-viewer.css'

export default class JsonViewer extends React.Component {
  public constructor (props) {
    super(props)
    this.state = { ast: {} }
  }

  public componentDidMount () {
    const editor = new MediumEditor('.editable', {
      toolbar: false
    })
    editor.subscribe('editableInput', (data) => {
      console.log('text changed : ', data.target.innerText)
      const ast = formatJSON(data.target.innerText)
      this.setState({ ast })
    })
    console.log(editor)
  }
  public render () {
    const state: any = this.state
    return (
      <div className='json-viewer'>
        <div className='editable json-viewer__editor'>
          Some <span className='tmp'>sample</span> text
        </div>
        <div className='json-viewer__view'>
          <p>Result</p>
          <JSONView ast={state.ast} omitBeginning={false} />
        </div>
      </div>
    )
  }
}
