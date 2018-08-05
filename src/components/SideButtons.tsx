import * as React from 'react'

import plusIcon from '../icons/plus.svg'
import minusIcon from '../icons/minus.svg'
import tableIcon from '../icons/table.svg'

class props {
  collapsed: boolean
  onClick: any
}

export const CollapseButton = ({ collapsed, onClick }: props): JSX.Element => {
  const icon = collapsed ? plusIcon : minusIcon
  const style: React.CSSProperties = {
    backgroundImage: `url('${icon}')`
  }
  return <span unselectable className='collapse-button' onClick={onClick} style={style} />
}

export const TableButton = ({ collapsed, onClick }: props): JSX.Element | null => {
  const style: React.CSSProperties = {
    backgroundImage: `url('${tableIcon}')`
  }
  return collapsed ? null : <span unselectable className='collapse-button' onClick={onClick} style={style} />
}
