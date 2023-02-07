import { objectType, nonNull } from 'nexus';

export const Plan = objectType({
  name: 'Plan',
  description: 'A',
  definition: (t) => {
    t.nonNull.string('id');
    t.string('title');
    t.int('max_phase_position');
  },
});

export const Phase = nonNull(
  objectType({
    name: 'Phase',
    definition: (t) => {
      t.nonNull.string('id');
      t.string('plan_id');
      t.string('title');
      t.boolean('is_complete');
      t.int('position');
    },
  })
);

export const Item = nonNull(
  objectType({
    name: 'Item',
    definition: (t) => {
      t.nonNull.string('id');
      t.string('title');
      t.string('phase_id');
      t.boolean('is_complete');
    },
  })
);

export const CreatePhaseResponse = objectType({
  name: 'CreatePhaseResponse',
  definition: (t) => {
    t.nonNull.string('id');
  },
});

export const UpdatePhaseResponse = objectType({
  name: 'UpdatePhaseResponse',
  definition: (t) => {
    t.nonNull.string('id');
    t.string('title');
  },
});

export const DeletePhaseResponse = objectType({
  name: 'DeletePhaseResponse',
  definition: (t) => {
    t.string('message');
  },
});

export const CreateItemResponse = objectType({
  name: 'CreateItemResponse',
  definition: (t) => {
    t.nonNull.string('id');
  },
});

export const UpdateItemResponse = objectType({
  name: 'UpdateItemResponse',
  definition: (t) => {
    t.nonNull.string('id');
    t.string('title');
    t.boolean('is_complete');
    t.string('phase_id');
  },
});

export const DeleteItemResponse = objectType({
  name: 'DeleteItemResponse',
  definition: (t) => {
    t.string('message');
  },
});

export const types = [Phase, Item];
