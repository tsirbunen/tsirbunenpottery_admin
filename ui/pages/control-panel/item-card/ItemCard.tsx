import ImageWithFallback, { FallbackIcon } from '@/ui/components/image-with-fallback/ImageWithFallback'
import ItemCardInfo, { ItemMainInfoProps } from './ItemCardInfo'
import ItemCardEditButton from './ItemCardEditButton'

type ItemCardProps = ItemMainInfoProps & {
  imageFileNames?: string[]
}

const imageSize = 120
const imageAlt = 'Item image'

const ItemCard = ({ idInfo, imageFileNames, mainInfo }: ItemCardProps) => {
  const exampleImageUrl = imageFileNames?.[0] ?? ''

  return (
    <div style={{ ...rowStyle }}>
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
  )
}

export default ItemCard

const rowStyle: React.CSSProperties = {
  alignItems: 'stretch',
  justifyContent: 'start',
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  gap: '15px',
  padding: '10px',
  borderRadius: '5px',
  margin: '10px 10px 0px 15px',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
}
