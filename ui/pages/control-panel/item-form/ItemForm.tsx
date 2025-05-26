import { Category, Collection, Design, Piece } from '@/ui/types/graphql-schema-types.generated'

type ItemFormProps = {
  selectedItem: Collection | Category | Design | Piece
}

const ItemForm = ({ selectedItem }: ItemFormProps) => {
  return (
    <div style={{ width: '100%' }}>
      <div {...columnStyle()}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} style={{ width: '20px', height: '50px', backgroundColor: 'powderblue' }}>
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemForm

const columnStyle = () => {
  return {
    style: {
      minWidth: '400px',
      justifyContent: 'start',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      gap: '15px',
      padding: '10px',
      borderRadius: '5px',
      margin: '0px 10px 0px 15px',
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    } as React.CSSProperties
  }
}
