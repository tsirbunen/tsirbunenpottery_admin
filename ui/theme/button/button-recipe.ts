import { defineRecipe } from '@chakra-ui/react'
import { Shades } from '../shades'
import { Visual } from '../visual-enum'

const common = {
  fontSize: '1.0em',
  borderRadius: '50px',
  padding: '10px',
  paddingTop: '5px',
  paddingBottom: '5px',
  marginRight: '5px',
  marginTop: '5px',
  _focus: { outline: 'none' },
  _hover: {
    bg: Shades.DARK,
    color: Shades.PALE
  }
}

const solid = {
  ...common,
  variant: 'solid',
  borderWidth: 0,
  bg: Shades.DARK,
  color: Shades.EXTREMELY_PALE
}

const outline = {
  ...common,
  variant: 'outline',
  borderWidth: '1.5px',
  bg: 'transparent',
  borderColor: Shades.DARK,
  color: Shades.DARK
}

const buttonVisuals: Record<Visual, object> = {
  solid,
  outline
}

export const buttonRecipe = defineRecipe({
  variants: {
    visual: buttonVisuals
  }
})
