/**
 * Injects dependencies into a service
 * @param service the service function
 * @returns the service with dependencies injected
 */
export const createServiceCreator = <Output>(service: (deps: ServiceDeps) => Output) => {
  return ({ db, getServices }: ServiceDeps): Output => service({ db, getServices });
};

/**
 * Calculates whether a phase is complete, based on the items it contains
 * @param phaseId the id of the phase
 * @param items an array of all items
 * @returns a boolean for whether the phase is complete
 */
export const phaseIsComplete = ({ phaseId, items }: { phaseId: string; items: Item[] }) => {
  const itemsForPhase = items.filter(({ phase_id }) => phase_id === phaseId);
  return !!(itemsForPhase.length && !itemsForPhase.find(({ is_complete }: { is_complete: boolean }) => !is_complete));
};

/**
 * Orders an array of phases based on their 'position' field
 * @param phases an array of phase objects
 * @returns the ordered array of phase objects
 */
export const orderPhases = (phases: Phase[]): Phase[] => phases.sort((a: Phase, b: Phase) => a.position - b.position);
