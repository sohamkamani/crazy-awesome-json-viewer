import * as React from 'react'
import { LevelCtx, OptionsCtx } from '../contexts'

const levelColors: string[] = [ 'tomato', 'lightsteelblue', 'green', 'purple' ]

const getLevelStyle = (l): React.CSSProperties => ({
  color: levelColors[l % 4]
})

const Colored = ({ children }) => (
  <LevelCtx.Consumer>
    {(level) => (
      <OptionsCtx.Consumer>
        {({ indentByLevel }) => <span style={getLevelStyle(level)}>{children}</span>}
      </OptionsCtx.Consumer>
    )}
  </LevelCtx.Consumer>
)

export const vestigial = (str: string): JSX.Element => (
  <Colored>
    <span className='json-vestigial'>{str}</span>
  </Colored>
)

export const jsonNumber = (str: string): JSX.Element => (
  <Colored>
    <span className='json-number'>{str}</span>
  </Colored>
)

export const literal = (str: string): JSX.Element => (
  <Colored>
    <span className='json-literal'>{str}</span>
  </Colored>
)

export const jsonString = (str: string): JSX.Element => (
  <Colored>
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
