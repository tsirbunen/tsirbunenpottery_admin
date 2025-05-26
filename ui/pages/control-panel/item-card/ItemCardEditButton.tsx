import { Shades } from '@/ui/theme/shades'
import { IconButton } from '@chakra-ui/react'
// FIXME: What icon to use?
// import { TbEdit, TbHandGrab } from 'react-icons/tb'
import { TbHandClick } from 'react-icons/tb'

const iconSize = 25
const iconButtonSize = 35

const ItemCardEditButton = () => {
  return (
    <div {...iconButtonContainerStyle}>
      <IconButton {...iconButtonStyle}>
        <TbHandClick size={iconSize} />
      </IconButton>
    </div>
  )
}

export default ItemCardEditButton

const iconButtonStyle = {
  color: Shades.DARK,
  backgroundColor: 'transparent',
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
