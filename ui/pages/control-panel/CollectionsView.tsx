import { useAppContext } from '@/ui/state/appContext'
import { Collection } from '@/ui/types/graphql-schema-types.generated'

const CollectionsView = () => {
  const { state } = useAppContext()
  console.log({ state })
  return <div style={{ ...columnStyle }}>collections view</div>
}

export default CollectionsView

const columnStyle: React.CSSProperties = {
  // justifyContent: 'center',
  // alignItems: 'start',
  // display: 'flex'
}
