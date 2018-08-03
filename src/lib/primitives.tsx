import * as React from 'react'
import { LevelCtx, OptionsCtx } from '../contexts'
import { HighlightModes } from '../components/Options'

const levelColors: string[] = [ 'tomato', 'lightsteelblue', 'green', 'purple' ]

const getLevelStyle = (l): React.CSSProperties => ({
  color: levelColors[l % 4]
})

const Colored = ({ children, style = {} }) => (
  <LevelCtx.Consumer>
    {(level) => (
      <OptionsCtx.Consumer>
        {({ highlightMode }) => (
          <span style={highlightMode === HighlightModes.Indentation ? getLevelStyle(level) : style}>{children}</span>
        )}
      </OptionsCtx.Consumer>
    )}
  </LevelCtx.Consumer>
)

export const vestigial = (str: string): JSX.Element => (
  <Colored style={{ color: '#b1b6c0' }}>
    <span className='json-vestigial'>{str}</span>
  </Colored>
)

export const jsonNumber = (str: string): JSX.Element => (
  <Colored style={{ color: '#392759' }}>
    <span className='json-number'>{str}</span>
  </Colored>
)

export const literal = (str: string): JSX.Element => (
  <Colored style={{ color: '#f7accf' }}>
    <span className='json-literal'>{str}</span>
  </Colored>
)

export const jsonString = (str: string): JSX.Element => (
  <Colored style={{ color: '#6874e8' }}>
    <span className='json-string'>{str}</span>
  </Colored>
)

export const wrapInQuotes = (objectKey: string): JSX.Element => (
  <span>
    {vestigial('"')}
    {jsonString(objectKey)}
    {vestigial('"')}
  </span>
)

export const key = (objectKey: string): JSX.Element | null =>
  objectKey ? (
    <span className='json-key'>
      {wrapInQuotes(objectKey)}
      {vestigial(' : ')}
    </span>
  ) : null
