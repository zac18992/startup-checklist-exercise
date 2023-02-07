import {
  itemFindAllService,
  itemFindAllByPhaseIdService,
  itemFindAllByPlanIdService,
  itemCreateOneService,
  itemDeleteService,
  itemUpdateService,
} from './items';
import db from '../db';
import { createServiceCreator } from './utility';
import { planFindByIdService, planUpdateService } from './plans';
import { itemFindByIdService } from './items';
import mapValues from 'lodash.mapvalues';
import {
  phaseFindAllByPlanIdService,
  phaseFindByIdService,
  phaseCreateOneService,
  phaseUpdateService,
  phaseDeleteService,
  phaseUpdateCompleteByIdService,
  phaseFindAllService,
} from './phases';

/**
 * An object with service creators as its fields. These should be called
 * with their respective dependencie. This allows dependency injection
 * to increase testability of services
 */
const serviceCreators: ServicesMethodCreators = {
  planFindById: createServiceCreator(planFindByIdService),
  planUpdate: createServiceCreator(planUpdateService),
  phaseFindAll: createServiceCreator(phaseFindAllService),
  phaseFindById: createServiceCreator(phaseFindByIdService),
  phaseFindAllByPlanId: createServiceCreator(phaseFindAllByPlanIdService),
  phaseCreateOne: createServiceCreator(phaseCreateOneService),
  phaseUpdate: createServiceCreator(phaseUpdateService),
  phaseDelete: createServiceCreator(phaseDeleteService),
  phaseUpdateCompleteById: createServiceCreator(phaseUpdateCompleteByIdService),
  itemFindAll: createServiceCreator(itemFindAllService),
  itemFindById: createServiceCreator(itemFindByIdService),
  itemFindAllByPlanId: createServiceCreator(itemFindAllByPlanIdService),
  itemFindAllByPhaseId: createServiceCreator(itemFindAllByPhaseIdService),
  itemCreateOne: createServiceCreator(itemCreateOneService),
  itemUpdate: createServiceCreator(itemUpdateService),
  itemDelete: createServiceCreator(itemDeleteService),
};

/**
 * Get service functions for executing common tasks (eg API calls).
 * @returns an object with service functions as its keys
 */
export const getServices = () => mapValues(serviceCreators, (servCreator) => servCreator({ db, getServices }));
