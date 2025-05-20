import { IconButton } from '@chakra-ui/react'
import { TbEdit } from 'react-icons/tb'

const iconSize = 25
const iconButtonSize = 35

const ItemCardEditButton = () => {
  return (
    <div {...iconButtonContainerStyle}>
      <IconButton {...iconButtonStyle}>
        <TbEdit size={iconSize} />
      </IconButton>
    </div>
  )
}

export default ItemCardEditButton

const iconButtonStyle = {
  borderWidth: 0,
  ariaLabel: 'Edit item',
  rounded: 'full',
  width: iconButtonSize,
  height: iconButtonSize,
  borderRadius: iconButtonSize
}

const iconButtonContainerStyle = {
  style: {
    display: 'flex',
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  } as React.CSSProperties
}
