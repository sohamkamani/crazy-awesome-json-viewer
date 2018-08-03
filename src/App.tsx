import * as React from 'react'
import './App.css'

import { OptionsCtx } from './contexts'
import JsonViewer from './components/JsonViewer'
import Options, { AppOptions, defaultOptions } from './components/Options'

class AppState {
  options: AppOptions
}

class App extends React.Component<any, AppState> {
  public constructor (props) {
    super(props)
    const defaultState: AppState = {
      options: defaultOptions
    }
    this.state = defaultState
  }
  private handleOptionChange (options: AppOptions) {
    this.setState({ options })
  }
  public render () {
    return (
      <OptionsCtx.Provider value={this.state.options}>
        <div className='App'>
          <h1>JSON Viewer</h1>
          <Options options={this.state.options} onChange={this.handleOptionChange.bind(this)} />
          <JsonViewer />
        </div>
      </OptionsCtx.Provider>
    )
  }
}

export default App
