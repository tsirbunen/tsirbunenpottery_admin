import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
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


export type MutationcreateCategoryArgs = {
  input: CategoryInput;
};


export type MutationcreateCollectionArgs = {
  input: CollectionInput;
};


export type MutationcreateDesignArgs = {
  input: DesignInput;
};


export type MutationcreatePieceArgs = {
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Category: ResolverTypeWrapper<Category>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  CategoryInput: CategoryInput;
  Collection: ResolverTypeWrapper<Collection>;
  CollectionInput: CollectionInput;
  Design: ResolverTypeWrapper<Design>;
  DesignInput: DesignInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Piece: ResolverTypeWrapper<Piece>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  PieceInput: PieceInput;
  ProductsData: ResolverTypeWrapper<ProductsData>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Category: Category;
  ID: Scalars['ID']['output'];
  CategoryInput: CategoryInput;
  Collection: Collection;
  CollectionInput: CollectionInput;
  Design: Design;
  DesignInput: DesignInput;
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  String: Scalars['String']['output'];
  Piece: Piece;
  Int: Scalars['Int']['output'];
  PieceInput: PieceInput;
  ProductsData: ProductsData;
  Query: {};
  Boolean: Scalars['Boolean']['output'];
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  names?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  names?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DesignResolvers<ContextType = any, ParentType extends ResolversParentTypes['Design'] = ResolversParentTypes['Design']> = {
  categoryIds?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  details?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  names?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationcreateCategoryArgs, 'input'>>;
  createCollection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<MutationcreateCollectionArgs, 'input'>>;
  createDesign?: Resolver<Maybe<ResolversTypes['Design']>, ParentType, ContextType, RequireFields<MutationcreateDesignArgs, 'input'>>;
  createPiece?: Resolver<Maybe<ResolversTypes['Piece']>, ParentType, ContextType, RequireFields<MutationcreatePieceArgs, 'input'>>;
  pingMutation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PieceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Piece'] = ResolversParentTypes['Piece']> = {
  collectionId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  designId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageFileNames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  serialNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductsData'] = ResolversParentTypes['ProductsData']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  designs?: Resolver<Array<ResolversTypes['Design']>, ParentType, ContextType>;
  pieces?: Resolver<Array<ResolversTypes['Piece']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allProducts?: Resolver<ResolversTypes['ProductsData'], ParentType, ContextType>;
  pingQuery?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  Design?: DesignResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Piece?: PieceResolvers<ContextType>;
  ProductsData?: ProductsDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

