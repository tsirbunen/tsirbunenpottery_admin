import { useAppContext } from '@/ui/state/appContext'
import PanelView from './PanelView'
import { Category } from '@/ui/types/graphql-schema-types.generated'

const CategoriesView = () => {
  const { state } = useAppContext()
  const categories = state.categories

  const mainInfoBuilder = (collection: Category) => {
    const categoryNames = collection.names as Record<string, string>
    return [{ label: 'Names', content: [Object.values(categoryNames)] }]
  }

  return <PanelView items={categories} mainInfoBuilder={mainInfoBuilder} />
}

export default CategoriesView
