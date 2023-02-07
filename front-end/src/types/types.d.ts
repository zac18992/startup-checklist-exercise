type IDObj = { id: string };

interface UpdatePhaseTitleInput {
  id: string;
  title: string;
}

interface DeletePhaseInput {
  id: string;
}

interface CreateItemInput {
  phase_id: string;
}

interface UpdateItemTitleInput {
  id: string;
  title: string;
}

interface UpdateItemCompleteInput {
  id: string;
  is_complete: boolean;
}

interface DeleteItemInput {
  id: string;
}
