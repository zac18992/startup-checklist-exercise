interface DB {
  connect: ReturnPromise<DB>;
  getPlan: ReturnPromiseFromIdObj<Plan>;
  updatePlan: ReturnPromiseFromIdMandatory<Plan, Plan>;
  createPhase: (argObj: CreatePhaseInputDB) => Promise<Phase>;
  getPhases: ReturnPromise<Phase[]>;
  getPhase: ReturnPromiseFromIdObj<Phase>;
  getPhasesByPlanId: ReturnPromiseFromIdObj<Phase[]>;
  updatePhase: ReturnPromiseFromIdMandatory<Phase, Phase>;
  deletePhase: ReturnPromiseFromIdObj<void>;
  getItems: ReturnPromise<Item[]>;
  getItemById: ReturnPromiseFromIdObj<Item>;
  getItemsByPlanId: ReturnPromiseFromIdObj<Item[]>;
  getItemsByPhaseId: ReturnPromiseFromIdObj<Item[]>;
  createItem: (argObj: CreateItemInputDB) => Promise<Item>;
  updateItem: ReturnPromiseFromIdMandatory<Item, Item>;
  deleteItem: ReturnPromiseFromIdObj<void>;
}

type PlanFindById = ReturnPromiseFromIdObj<Plan>;
type PlanUpdate = ReturnPromiseFromIdMandatory<Plan, Plan>;
type PhaseFindAll = ReturnPromise<Phase[]>;
type PhaseFindById = ReturnPromiseFromIdObj<Phase>;
type PhaseFindAllByPlanId = ReturnPromiseFromIdObj<Phase[]>;
type PhaseCreateOne = (argObj: GetItemsInput) => Promise<Phase>;
type PhaseUpdate = ReturnPromiseFromIdMandatory<Phase, Phase>;
type PhaseDelete = ReturnPromiseFromIdObj<void>;
type PhaseUpdateCompleteById = (argObj: UpdatePhaseCompletionInput) => Promise<void>;
type ItemFindAll = ReturnPromise<Item[]>;
type ItemFindById = ReturnPromiseFromIdObj<Item>;
type ItemFindAllByPlanId = ReturnPromiseFromIdObj<Item[]>;
type ItemFindAllByPhaseId = ReturnPromiseFromIdObj<Item[]>;
type ItemCreateOne = (argObj: CreateItemInput) => Promise<Item>;
type ItemUpdate = ReturnPromiseFromIdMandatory<Item, Item>;
type ItemDelete = ReturnPromiseFromIdObj<void>;

interface Services {
  planFindById: PlanFindById;
  planUpdate: PlanUpdate;
  phaseFindAll: PhaseFindAll;
  phaseFindById: PhaseFindById;
  phaseFindAllByPlanId: PhaseFindAllByPlanId;
  phaseCreateOne: PhaseCreateOne;
  phaseUpdate: PhaseUpdate;
  phaseDelete: PhaseDelete;
  phaseUpdateCompleteById: PhaseUpdateCompleteById;
  itemFindAll: ItemFindAll;
  itemFindById: ItemFindById;
  itemFindAllByPlanId: ItemFindAllByPlanId;
  itemFindAllByPhaseId: ItemFindAllByPhaseId;
  itemCreateOne: ItemCreateOne;
  itemUpdate: ItemUpdate;
  itemDelete: ItemDelete;
}

type ServicesCreator = () => Services;

type ServiceCreatorType<ServiceType> = (argObj: ServiceDeps) => ServiceType;

interface ServicesMethodCreators {
  planFindById: ServiceCreatorType<PlanFindById>;
  planUpdate: ServiceCreatorType<PlanUpdate>;
  phaseFindAll: ServiceCreatorType<PhaseFindAll>;
  phaseFindById: ServiceCreatorType<PhaseFindById>;
  phaseFindAllByPlanId: ServiceCreatorType<PhaseFindAllByPlanId>;
  phaseCreateOne: ServiceCreatorType<PhaseCreateOne>;
  phaseUpdate: ServiceCreatorType<PhaseUpdate>;
  phaseDelete: ServiceCreatorType<PhaseDelete>;
  phaseUpdateCompleteById: ServiceCreatorType<PhaseUpdateCompleteById>;
  itemFindAll: ServiceCreatorType<ItemFindAll>;
  itemFindById: ServiceCreatorType<ItemFindById>;
  itemFindAllByPlanId: ServiceCreatorType<ItemFindAllByPlanId>;
  itemFindAllByPhaseId: ServiceCreatorType<ItemFindAllByPhaseId>;
  itemCreateOne: ServiceCreatorType<ItemCreateOne>;
  itemUpdate: ServiceCreatorType<ItemUpdate>;
  itemDelete: ServiceCreatorType<ItemDelete>;
}

interface ServiceDeps {
  db: DB;
  getServices: ServicesCreator;
}
