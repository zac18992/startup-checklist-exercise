import { v4 as uuidv4 } from 'uuid';
import items from './mocks/items';
import phases from './mocks/phases';
import omitBy from 'lodash.omitby';
import isNil from 'lodash.isnil';
import plans from './mocks/plans';
import map from 'lodash.map';

const db: DB = {
  connect: async () => db,
  // PLANS
  getPlan: async ({ id }) => plans[id],
  updatePlan: async (updatesObj) => {
    const { id } = updatesObj;

    const newPlan = {
      ...plans[id],
      ...omitBy(updatesObj, (v) => isNil(v)),
    };

    plans[id] = newPlan;

    return newPlan;
  },
  // PHASES
  getPhases: async () => map(phases),
  getPhase: async ({ id }) => phases[id],
  getPhasesByPlanId: async ({ id }) => map(phases).filter(({ plan_id }) => id === plan_id),
  createPhase: async ({ plan_id, position }) => {
    const phase = {
      id: uuidv4(),
      plan_id,
      title: '',
      is_complete: false,
      position,
    };

    return await db.updatePhase(phase);
  },
  updatePhase: async (updatesObj) => {
    const { id } = updatesObj;

    const newPhase = {
      ...phases[id],
      ...omitBy(updatesObj, (v) => isNil(v)),
    };

    phases[id] = newPhase;

    return newPhase;
  },
  deletePhase: async ({ id }) => {
    delete phases[id];

    return;
  },
  // ITEMS
  getItems: async () => map(items),
  getItemById: async ({ id }) => items[id],
  getItemsByPlanId: async ({ id }) => map(items).filter(({ plan_id }) => plan_id === id),
  getItemsByPhaseId: async ({ id }) => map(items).filter(({ phase_id }) => phase_id === id),
  createItem: async ({ phase_id, plan_id }) => {
    const item = {
      id: uuidv4(),
      plan_id,
      phase_id,
      title: '',
      is_complete: false,
    };

    return await db.updateItem(item);
  },
  updateItem: async (updatesObj) => {
    const { id } = updatesObj;

    const newItem = {
      ...items[id],
      ...omitBy(updatesObj, (v) => isNil(v)),
    };

    items[id] = newItem;

    return newItem;
  },
  deleteItem: async ({ id }) => {
    delete items[id];

    return;
  },
};

export default db;
