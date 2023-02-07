interface Plan {
  id: string;
  title: string;
  max_phase_position: number;
}

interface Phase {
  id: string;
  plan_id: string;
  title: string;
  is_complete: boolean;
  position: number;
}

interface Item {
  id: string;
  plan_id: string;
  phase_id: string;
  title: string;
  is_complete: boolean;
}

interface CreatePhaseInput {
  planId: string;
}

interface CreatePhaseInputDB {
  plan_id: string;
  position: number;
}

interface UpdatePhaseCompletionInput {
  id: string;
  planId?: string;
}

interface GetItemsInput {
  planId: string;
}

interface CreateItemInput {
  planId: string;
  phaseId: string;
}

interface CreateItemInputDB {
  plan_id: string;
  phase_id: string;
}
