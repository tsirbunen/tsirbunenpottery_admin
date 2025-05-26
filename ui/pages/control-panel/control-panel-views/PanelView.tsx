import { Text } from '@chakra-ui/react'
import ItemCard from '../item-card/ItemCard'
import { useSelectItem } from './useSelectItem'
import ItemForm from '../item-form/ItemForm'
import { Collection, Category, Design, Piece } from '@/ui/types/graphql-schema-types.generated'
import { MainInfo } from '../item-card/ItemCardInfo'
import styles from './PanelView.module.css'
import { Shades } from '@/ui/theme/shades'

const titleAll = 'All'
const titleSelected = 'Selected'

type PanelViewProps = {
  items: Collection[] | Category[] | Design[] | Piece[]
  mainInfoBuilder: (item: any) => MainInfo
}

const PanelView = ({ items, mainInfoBuilder }: PanelViewProps) => {
  const { selectedId, selectItem } = useSelectItem()

  return (
    <div {...rowCss}>
      <div {...columnCss}>
        <Text {...titleCss}>{titleAll.toUpperCase()}</Text>
        <div {...containerCss}>
          <div className={`${styles.scrollable}`} {...itemsContainerCss}>
            {items.map((item) => {
              const itemId = item.id
              const fileNames = (item as Piece).imageFileNames

              return (
                <ItemCard
                  key={itemId}
                  idInfo={{ id: itemId }}
                  imageFileNames={fileNames}
                  mainInfo={mainInfoBuilder(item)}
                  selectItem={() => selectItem(itemId)}
                  isSelected={selectedId === itemId}
                />
              )
            })}
          </div>
        </div>
      </div>

      {selectedId ? (
        <div {...columnCss}>
          <Text {...titleCss}>{titleSelected.toUpperCase()}</Text>
          <div {...containerCss}>
            <div className={`${styles.scrollable}`} {...itemsContainerCss}>
              <ItemForm selectedItem={items.find((item) => item.id === selectedId)!} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default PanelView

const columnCss = {
  style: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '80vh',
    maxWidth: '600px',
    marginTop: '10px'
  } as React.CSSProperties
}

const containerCss = {
  style: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    overflow: 'hidden'
  } as React.CSSProperties
}

const itemsContainerCss = {
  style: {
    alignItems: 'start',
    flexDirection: 'column',
    display: 'flex',
    flex: 1,
    gap: '15px',
    overflowY: 'auto',
    paddingBottom: '15px',
    scrollbarGutter: 'stable'
  } as React.CSSProperties
}

const rowCss = {
  style: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: '100vh',
    width: '100%',
    overflow: 'hidden'
  } as React.CSSProperties
}

const titleCss = {
  style: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Shades.MEDIUM
  } as React.CSSProperties
}
