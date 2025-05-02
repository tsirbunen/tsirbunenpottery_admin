'use client'

import { chakra, useRecipe } from '@chakra-ui/react'
import { buttonRecipe } from './button-recipe'
import type { RecipeVariantProps } from '@chakra-ui/react'

type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>

export interface ButtonProps extends React.PropsWithChildren<ButtonVariantProps> {
  onClick?: () => void
}

/**
 *
 * Use example:
 *    <Button visual={Visual.SOLID} onClick={() => console.log('click')}>
 *      label
 *    </Button>
 */
export const Button = (props: ButtonProps) => {
  const recipe = useRecipe({ recipe: buttonRecipe })
  const [recipeProps, rest] = recipe.splitVariantProps(props)
  const styles = recipe(recipeProps)

  return <chakra.button css={styles} {...rest} />
}
