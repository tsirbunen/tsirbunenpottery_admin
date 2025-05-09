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
  boxShadow: 'none',
  _focus: { outline: 'none' },
  _hover: {
    bg: Shades.DARK,
    color: Shades.PALE
  }
}

const solid = {
  ...common,
  variant: 'solid',
  borderWidth: 0
}

const solidDark = {
  ...solid,
  bg: Shades.DARK,
  color: Shades.EXTREMELY_PALE
}

const solidPale = {
  ...solid,
  borderWidth: 0,
  bg: Shades.PALE,
  color: Shades.EXTREMELY_PALE
}

const outline = {
  ...common,
  variant: 'outline',
  borderWidth: 2.0,
  bg: 'transparent'
}

const outlineDark = {
  ...outline,
  borderColor: Shades.DARK,
  color: Shades.DARK
}

const outlinePale = {
  ...outline,
  borderColor: Shades.MEDIUM,
  color: Shades.MEDIUM
}

const buttonVisuals: Record<Visual, object> = {
  solidDark,
  solidPale,
  outlineDark,
  outlinePale
}

export const buttonRecipe = defineRecipe({
  variants: {
    visual: buttonVisuals
  }
})
