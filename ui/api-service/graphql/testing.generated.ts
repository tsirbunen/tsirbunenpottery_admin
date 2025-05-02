import * as Types from '../../types/graphql-schema-types.generated';

export type PingProductsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PingProductsQuery = { __typename?: 'Query', allProducts: { __typename?: 'ProductsData', collections: Array<{ __typename?: 'Collection', id: string, names: any }>, categories: Array<{ __typename?: 'Category', id: string, names: any }>, designs: Array<{ __typename?: 'Design', id: string, names: any, categoryIds: Array<string>, description: any, details: any }>, pieces: Array<{ __typename?: 'Piece', id: string, serialNumber: number, designId: string, imageFileNames: Array<string>, collectionId?: string | null }> } };
