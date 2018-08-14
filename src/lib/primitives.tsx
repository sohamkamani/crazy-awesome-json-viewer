import * as React from 'react'
import { LevelCtx, OptionsCtx } from '../contexts'
import { HighlightModes, AppOptions } from '../components/Options'

const levelColors: string[] = [ 'tomato', 'cornflowerblue', 'green', 'purple' ]
const levelStyle: React.CSSProperties[] = [
  { fontWeight: 'bold' },
  { fontWeight: 'lighter' },
  { fontStyle: 'italic' },
  { textDecoration: 'underline' }
]
const typeStyle = {
  vestigial: levelStyle[1],
  jsonNumber: levelStyle[0],
  literal: levelStyle[2],
  jsonString: levelStyle[3]
}
const typeColors = {
  vestigial: '#b1b6c0',
  jsonNumber: '#392759',
  literal: '#f7accf',
  jsonString: '#6874e8'
}

const getLevelStyle = (l): React.CSSProperties => ({
  color: levelColors[l % 4]
})

const Colored = ({ children, type }) => (
  <LevelCtx.Consumer>
    {(level) => (
      <OptionsCtx.Consumer>
        {({ highlightMode, colorblindMode }: AppOptions) => {
          const textStyle: React.CSSProperties =
            highlightMode === HighlightModes.Indentation ? getLevelStyle(level) : { color: typeColors[type] }
          if (colorblindMode) {
            Object.assign(
              textStyle,
              highlightMode === HighlightModes.Indentation ? levelStyle[level % 4] : typeStyle[type]
            )
            console.log(textStyle)
          }
          return <span style={textStyle}>{children}</span>
        }}
      </OptionsCtx.Consumer>
    )}
  </LevelCtx.Consumer>
)

export const vestigial = (str: string): JSX.Element => (
  <Colored type='vestigial'>
    <span className='json-vestigial'>{str}</span>
  </Colored>
)

export const jsonNumber = (str: string): JSX.Element => (
  <Colored type='jsonNumber'>
    <span className='json-number'>{str}</span>
  </Colored>
)

export const literal = (str: string): JSX.Element => (
  <Colored type='literal'>
    <span className='json-literal'>{str}</span>
  </Colored>
)

export const jsonString = (str: string): JSX.Element => (
  <Colored type='jsonString'>
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
