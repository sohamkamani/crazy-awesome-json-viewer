import * as React from 'react'

import Layout from 'antd/lib/layout'
import { OptionsCtx } from './contexts'
import JsonViewer from './components/JsonViewer'
import Options, { AppOptions, defaultOptions } from './components/Options'

import 'antd/lib/layout/style/css'
import './App.css'

const { Header, Content, Sider } = Layout

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
        <Layout className='App'>
          <Header className='header'>
            <h1>
              <span>Crazy Awesome</span> JSON Viewer
            </h1>
          </Header>
          <Layout>
            <Sider className='sidebar' width={250}>
              <Options options={this.state.options} onChange={this.handleOptionChange.bind(this)} />
              <footer>
                <a href='http://github.com/sohamkamani/crazy-awesome-json-viewer'>Made with ❤️</a>
              </footer>
            </Sider>
            <Layout>
              <Content>
                <JsonViewer />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </OptionsCtx.Provider>
    )
  }
}

export default App
