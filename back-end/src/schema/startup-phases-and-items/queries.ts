import { Phase, Item, Plan } from './types';
import { list, extendType, nonNull, stringArg } from 'nexus';

const GetPlan = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('plan', {
      type: Plan,
      args: { id: nonNull(stringArg()) },
      resolve: async (root, { id }, ctx) => await ctx.getServices().planFindById({ id }),
    });
  },
});

const GetAllPhasesQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('phases', {
      type: list(Phase),
      args: { planId: nonNull(stringArg()) },
      resolve: async (root, { planId }, ctx) => await ctx.getServices().phaseFindAllByPlanId({ id: planId }),
    });
  },
});

const GetAllItemsQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('items', {
      type: list(Item),
      args: { planId: nonNull(stringArg()) },
      resolve: async (root, { planId }, ctx) => await ctx.getServices().itemFindAllByPlanId({ id: planId }),
    });
  },
});

export const queries = [GetPlan, GetAllPhasesQuery, GetAllItemsQuery];
