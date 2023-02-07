import {
  UpdateItemResponse,
  CreateItemResponse,
  CreatePhaseResponse,
  UpdatePhaseResponse,
  DeletePhaseResponse,
  DeleteItemResponse,
} from './types';
import { extendType, stringArg, nonNull, booleanArg } from 'nexus';

const CreatePhaseMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createPhase', {
      type: CreatePhaseResponse,
      args: { planId: nonNull(stringArg()) },
      resolve: async (root, { planId }, ctx) => await ctx.getServices().phaseCreateOne({ planId }),
    });
  },
});

const UpdatePhaseMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updatePhase', {
      type: UpdatePhaseResponse,
      args: {
        id: nonNull(stringArg()),
        title: stringArg(),
      },
      resolve: async (root, { id, title }, ctx) => await ctx.getServices().phaseUpdate({ id, title }),
    });
  },
});

const DeletePhaseMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deletePhase', {
      type: DeletePhaseResponse,
      args: { id: nonNull(stringArg()) },
      resolve: async (root, { id }, ctx) => {
        await ctx.getServices().phaseDelete({ id });

        return { message: '' };
      },
    });
  },
});

const CreateItemMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createItem', {
      type: CreateItemResponse,
      args: { planId: nonNull(stringArg()), phaseId: nonNull(stringArg()) },
      resolve: async (root, { planId, phaseId }, ctx) => await ctx.getServices().itemCreateOne({ planId, phaseId }),
    });
  },
});

const UpdateItemMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateItem', {
      type: UpdateItemResponse,
      args: {
        id: nonNull(stringArg()),
        title: stringArg(),
        isComplete: booleanArg(),
      },
      resolve: async (root, { id, title, isComplete }, ctx) =>
        await ctx.getServices().itemUpdate({
          id,
          title,
          is_complete: isComplete,
        }),
    });
  },
});

const DeleteItemMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteItem', {
      type: DeleteItemResponse,
      args: { id: nonNull(stringArg()) },
      resolve: async (root, { id }, ctx) => {
        await ctx.getServices().itemDelete({ id });

        return { message: '' };
      },
    });
  },
});

export const mutations = [
  CreatePhaseMutation,
  UpdatePhaseMutation,
  DeletePhaseMutation,
  CreateItemMutation,
  UpdateItemMutation,
  DeleteItemMutation,
];
