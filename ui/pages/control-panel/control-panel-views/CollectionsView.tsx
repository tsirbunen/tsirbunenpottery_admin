import { useAppContext } from '@/ui/state/appContext'
import PanelView from './PanelView'
import { Collection } from '@/ui/types/graphql-schema-types.generated'

const CollectionsView = () => {
  const { state } = useAppContext()
  const collections = state.collections

  const mainInfoBuilder = (collection: Collection) => {
    const collectionNames = collection.names as Record<string, string>
    return [{ label: 'Names', content: [Object.values(collectionNames)] }]
  }

  return <PanelView items={collections} mainInfoBuilder={mainInfoBuilder} />
}

export default CollectionsView
