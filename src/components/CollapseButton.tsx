import * as React from 'react'

import plusIcon from '../icons/plus.svg'
import minusIcon from '../icons/minus.svg'

class props {
  collapsed: boolean
  onClick: any
}

export default ({ collapsed, onClick }: props): JSX.Element => {
  const icon = collapsed ? plusIcon : minusIcon
  const style: React.CSSProperties = {
    backgroundImage: `url('${icon}')`
  }
  return <span unselectable className='collapse-button' onClick={onClick} style={style} />
}
