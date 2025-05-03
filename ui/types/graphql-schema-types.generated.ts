export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  names: Scalars['JSON']['output'];
};

export type CategoryInput = {
  names: Scalars['JSON']['input'];
};

export type Collection = {
  __typename?: 'Collection';
  id: Scalars['ID']['output'];
  names: Scalars['JSON']['output'];
};

export type CollectionInput = {
  names: Scalars['JSON']['input'];
};

export type Design = {
  __typename?: 'Design';
  categoryIds: Array<Scalars['ID']['output']>;
  description: Scalars['JSON']['output'];
  details: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  names: Scalars['JSON']['output'];
};

export type DesignInput = {
  categoryIds: Array<Scalars['ID']['input']>;
  description: Scalars['JSON']['input'];
  details: Scalars['JSON']['input'];
  names: Scalars['JSON']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory?: Maybe<Category>;
  createCollection?: Maybe<Collection>;
  createDesign?: Maybe<Design>;
  createPiece?: Maybe<Piece>;
  pingMutation?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateCategoryArgs = {
  input: CategoryInput;
};


export type MutationCreateCollectionArgs = {
  input: CollectionInput;
};


export type MutationCreateDesignArgs = {
  input: DesignInput;
};


export type MutationCreatePieceArgs = {
  input: PieceInput;
};

export type Piece = {
  __typename?: 'Piece';
  collectionId?: Maybe<Scalars['ID']['output']>;
  designId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  imageFileNames: Array<Scalars['String']['output']>;
  serialNumber: Scalars['Int']['output'];
};

export type PieceInput = {
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  designId: Scalars['ID']['input'];
  imageFileNames: Array<Scalars['String']['input']>;
};

export type ProductsData = {
  __typename?: 'ProductsData';
  categories: Array<Category>;
  collections: Array<Collection>;
  designs: Array<Design>;
  pieces: Array<Piece>;
};

export type Query = {
  __typename?: 'Query';
  allProducts: ProductsData;
  pingQuery?: Maybe<Scalars['String']['output']>;
};
