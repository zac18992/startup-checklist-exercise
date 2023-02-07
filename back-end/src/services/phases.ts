import map from 'lodash.map';
import { phaseIsComplete, orderPhases } from './utility';

export const phaseFindAllService = ({ db }: ServiceDeps) => async (): Promise<Phase[]> =>
  orderPhases(await db.getPhases());

export const phaseFindByIdService = ({ db }: ServiceDeps) => async ({ id }: IDObj): Promise<Phase> =>
  await db.getPhase({ id });

export const phaseFindAllByPlanIdService = ({ db }: ServiceDeps) => async ({ id }: IDObj): Promise<Phase[]> =>
  await db.getPhasesByPlanId({ id });

export const phaseCreateOneService = ({ db, getServices }: ServiceDeps) => async ({
  planId,
}: CreatePhaseInput): Promise<Phase> => {
  // Get the phases for this plan
  const phases = await getServices().phaseFindAllByPlanId({ id: planId });

  // Create a new phase, incrementing from the highest phase position
  const phase = await db.createPhase({
    plan_id: planId,
    position: phases[phases.length - 1].position + 1,
  });

  return phase;
};

export const phaseUpdateService = ({ db }: ServiceDeps) => async (updates: IDMandatory<Phase>): Promise<Phase> =>
  await db.updatePhase(updates);

export const phaseDeleteService = ({ db, getServices }: ServiceDeps) => async ({ id }: IDObj): Promise<void> => {
  const services = getServices();

  // Get the phase
  const phase = await services.phaseFindById({ id });
  // Get all items for this phase
  const items = await services.itemFindAllByPhaseId({ id });

  // Delete all the items for this phase
  await Promise.allSettled<void>(map(items).map(async ({ id }: Item) => await db.deleteItem({ id })));
  // Delete the phase
  await db.deletePhase({ id });
  // Update the phase completion status as removing a phase affects the max phase position
  await services.phaseUpdateCompleteById({ id, planId: phase.plan_id });

  return;
};

export const phaseUpdateCompleteByIdService = ({ getServices }: ServiceDeps) => async ({
  id,
  planId: passedPlanId,
}: UpdatePhaseCompletionInput) => {
  const services = getServices();

  let planId = passedPlanId;

  // Get all the items and phases
  const items = await services.itemFindAll();
  const phases = await services.phaseFindAll();

  // Find the first phase which is incomplete. This will now become the max phase position
  const indexOfFirstIncompletePhase = phases.findIndex(
    ({ id: phaseId }: IDObj) => !phaseIsComplete({ phaseId, items })
  );
  const maxPhasePosition =
    phases[indexOfFirstIncompletePhase === -1 ? phases.length - 1 : Math.max(indexOfFirstIncompletePhase, 0)]
      ?.position || 1;

  if (!!phases.find((p) => p.id === id)) {
    // Update the phase completion state in the DB
    const phase = await services.phaseUpdate({
      id,
      is_complete: phaseIsComplete({ phaseId: id, items }),
    });

    if (phase) {
      planId = phase.plan_id;
    }
  }

  if (planId) {
    // Update the DB with the latest completed position
    await getServices().planUpdate({ id: planId, max_phase_position: maxPhasePosition });
  }

  return;
};
