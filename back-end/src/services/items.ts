export const itemFindAllService = ({ db }: ServiceDeps) => async (): Promise<Item[]> => await db.getItems();

export const itemFindAllByPlanIdService = ({ db }: ServiceDeps) => async ({ id }: IDObj): Promise<Item[]> =>
  db.getItemsByPlanId({ id });

export const itemFindByIdService = ({ db }: ServiceDeps) => async ({ id }: IDObj): Promise<Item> =>
  await db.getItemById({ id });

export const itemFindAllByPhaseIdService = ({ db }: ServiceDeps) => async ({ id }: IDObj): Promise<Item[]> =>
  await db.getItemsByPhaseId({ id });

export const itemCreateOneService = ({ db, getServices }: ServiceDeps) => async ({
  planId,
  phaseId,
}: CreateItemInput): Promise<Item> => {
  // Create a new item
  const item = await db.createItem({ phase_id: phaseId, plan_id: planId });

  // Update the phase completion status because we have added an incomplete item
  await getServices().phaseUpdateCompleteById({ id: phaseId });

  return item;
};

export const itemUpdateService = ({ db, getServices }: ServiceDeps) => async (
  updates: IDMandatory<Item>
): Promise<Item> => {
  // Update the item
  const newItem = await db.updateItem(updates);

  const { phase_id } = newItem;

  // Update the phase completion status because the status of one of its item could have changed
  await getServices().phaseUpdateCompleteById({ id: phase_id });

  return newItem;
};

export const itemDeleteService = ({ db, getServices }: ServiceDeps) => async ({ id }: IDObj): Promise<void> => {
  const services = getServices();

  // Get the item from the DB to get the phase it belongs to
  const { phase_id } = await services.itemFindById({ id });
  await db.deleteItem({ id });

  // Update the phase completion status because deleting an item have affected it
  await services.phaseUpdateCompleteById({ id: phase_id });

  return;
};
