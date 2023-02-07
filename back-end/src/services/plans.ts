export const planFindByIdService = ({ db }: ServiceDeps) => async ({ id }: IDObj): Promise<Plan> =>
  await db.getPlan({ id });

export const planUpdateService = ({ db }: ServiceDeps) => async (updates: IDMandatory<Plan>): Promise<Plan> =>
  await db.updatePlan(updates);
