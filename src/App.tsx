import * as React from 'react'
import './App.css'

import JsonViewer from './components/JsonViewer'
// import logo from './logo.svg'

class App extends React.Component {
  public render () {
    return (
      <div className='App'>
        <h1>JSON Viewer</h1>
        <JsonViewer />
      </div>
    )
  }
}

export default App
