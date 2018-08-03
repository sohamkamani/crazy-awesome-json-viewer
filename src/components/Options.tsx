import * as React from 'react'
import Radio from 'antd/lib/radio'
import 'antd/lib/radio/style/css'

export enum HighlightModes {
  Default = 'default',
  Indentation = 'indentation'
}

export class AppOptions {
  highlightMode: HighlightModes
}

class PropTypes {
  options: AppOptions
  onChange: ((opts: AppOptions) => void)
}

export default class Options extends React.Component<PropTypes> {
  handleHighlightModeChange (e) {
    this.props.onChange(Object.assign(this.props.options, { highlightMode: e.target.value }))
  }
  render () {
    return (
      <div>
        <div>Highlight mode</div>
        <Radio.Group onChange={this.handleHighlightModeChange.bind(this)} value={this.props.options.highlightMode}>
          <Radio.Button value='default'>Default</Radio.Button>
          <Radio.Button value='indentation'>Indentation</Radio.Button>
        </Radio.Group>
      </div>
    )
  }
}

export const defaultOptions: AppOptions = {
  highlightMode: HighlightModes.Default
}
