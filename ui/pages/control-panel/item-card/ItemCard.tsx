import ImageWithFallback, { FallbackIcon } from '@/ui/components/image-with-fallback/ImageWithFallback'
import ItemCardInfo, { ItemMainInfoProps } from './ItemCardInfo'
import ItemCardEditButton from './ItemCardEditButton'
import { useUiComponentHover } from '../control-panel-views/useUiComponentHover'
import { Shades } from '@/ui/theme/shades'

type ItemCardProps = ItemMainInfoProps & {
  imageFileNames?: string[]
  selectItem: () => void
  isSelected: boolean
}

const imageSize = 120
const imageAlt = 'Item image'

const ItemCard = ({ idInfo, imageFileNames, mainInfo, isSelected, selectItem }: ItemCardProps) => {
  const hoverId = idInfo.id

  const { isHovered } = useUiComponentHover({ hoverId })

  const exampleImageUrl = imageFileNames?.[0] ?? ''

  return (
    <div style={{ width: '100%' }}>
      <div {...rowStyle(isSelected, isHovered)} id={hoverId} onClick={selectItem}>
        {exampleImageUrl ? (
          <ImageWithFallback
            mainPhotoUrl={exampleImageUrl}
            fallbackIcon={FallbackIcon.FOOD}
            borderRadius={'5px'}
            imageHeight={imageSize}
            imageWidth={imageSize}
            imageAlt={imageAlt}
          />
        ) : null}

        <ItemCardInfo idInfo={idInfo} mainInfo={mainInfo} />

        <ItemCardEditButton />
      </div>
    </div>
  )
}

export default ItemCard

const rowStyle = (isSelected: boolean, isHovered: boolean) => {
  return {
    style: {
      minWidth: '400px',
      backgroundColor: isSelected || isHovered ? Shades.VERY_PALE : undefined,
      justifyContent: 'start',
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      gap: '15px',
      padding: '10px',
      borderRadius: '5px',
      margin: '0px 10px 0px 15px',
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 5px 20px 0px'
    } as React.CSSProperties
  }
}
