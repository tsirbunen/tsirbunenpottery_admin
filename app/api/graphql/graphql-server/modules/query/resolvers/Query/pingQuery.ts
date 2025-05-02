import type { QueryResolvers } from '../../../types.generated'

//FIXME: Figure out why the eslint rules not not silence these errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const pingQuery: NonNullable<QueryResolvers['pingQuery']> = async (_parent, _arg, _ctx) => {
  return 'pong'
}
