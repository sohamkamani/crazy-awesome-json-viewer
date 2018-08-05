import * as React from 'react'
import Radio from 'antd/lib/radio'
import 'antd/lib/radio/style/css'
import './options.css'

export enum HighlightModes {
  Default = 'default',
  Indentation = 'indentation'
}

export enum TextSizes {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export class AppOptions {
  highlightMode: HighlightModes
  textSize: TextSizes
}

class PropTypes {
  options: AppOptions
  onChange: ((opts: AppOptions) => void)
}

const Label = ({ value }): JSX.Element => (
  <div className='app-option__label-out'>
    <div className='app-option__label-in'>{value}</div>
  </div>
)

export default class Options extends React.Component<PropTypes> {
  handleHighlightModeChange (e) {
    this.props.onChange(Object.assign(this.props.options, { highlightMode: e.target.value }))
  }
  handleTextSizeChange (e) {
    this.props.onChange(Object.assign(this.props.options, { textSize: e.target.value }))
  }
  render () {
    return (
      <div>
        {/* Highlight Mode */}
        <div className='app-option'>
          <Label value='Highlight Mode :' />
          <Radio.Group
            className='app-option__option'
            onChange={this.handleHighlightModeChange.bind(this)}
            value={this.props.options.highlightMode}
          >
            <Radio.Button value={HighlightModes.Default}>Default</Radio.Button>
            <Radio.Button value={HighlightModes.Indentation}>Indentation</Radio.Button>
          </Radio.Group>
        </div>

        {/* Text Size */}
        <div className='app-option'>
          <Label value='Text Size :' />
          <Radio.Group
            className='app-option__option'
            onChange={this.handleTextSizeChange.bind(this)}
            value={this.props.options.textSize}
            style={{ display: 'flex', fontFamily: 'Times New Roman' }}
          >
            <Radio.Button value={TextSizes.Small}>
              <div style={{ height: '50px', fontSize: '0.6em' }}>T</div>
            </Radio.Button>
            <Radio.Button value={TextSizes.Medium}>
              <div style={{ height: '50px', fontSize: '1.0em' }}>T</div>
            </Radio.Button>
            <Radio.Button value={TextSizes.Large}>
              <div style={{ height: '50px', fontSize: '1.4em' }}>T</div>
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    )
  }
}

export const defaultOptions: AppOptions = {
  highlightMode: HighlightModes.Default,
  textSize: TextSizes.Medium
}
