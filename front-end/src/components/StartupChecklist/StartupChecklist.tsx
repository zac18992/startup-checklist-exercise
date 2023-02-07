import { ReactElement, useCallback } from 'react';
import { useGetPlanQuery, useCreatePhaseMutation, useCreateItemMutation } from 'generated/gql/schema';
import Checklist from 'modules/component-library/components/Checklist';
import { useQueryClient } from '@tanstack/react-query';
import {
  useUpdateItemMutation,
  useDeleteItemMutation,
  useDeletePhaseMutation,
  useUpdatePhaseMutation,
} from '../../generated/gql/schema';
import styles from './StartupChecklist.module.scss';
import type { Item } from 'generated/gql/schema';

interface Props {
  planId: string;
}

const StartupChecklist = ({ planId }: Props): ReactElement => {
  const queryClient = useQueryClient();

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries();
  }, [queryClient]);

  const { isLoading: isLoadingPlan, data } = useGetPlanQuery({ id: planId });
  const { mutate: createPhase, isLoading: isCreatingPhase } = useCreatePhaseMutation({ onSuccess });
  const { mutate: updatePhase, isLoading: isUpdatingPhase } = useUpdatePhaseMutation({ onSuccess });
  const { mutate: deletePhase, isLoading: isDeletingPhase } = useDeletePhaseMutation({ onSuccess });
  const { mutate: createItem, isLoading: isCreatingItem } = useCreateItemMutation({ onSuccess });
  const { mutate: updateItem, isLoading: isUpdatingItem } = useUpdateItemMutation({ onSuccess });
  const { mutate: deleteItem, isLoading: isDeletingItem } = useDeleteItemMutation({ onSuccess });

  const handleCreatePhase = useCallback(() => createPhase({ planId }), [createPhase, planId]);
  const handleUpdatePhase = useCallback(
    ({ id, title }: UpdatePhaseTitleInput) => updatePhase({ id, title }),
    [updatePhase]
  );
  const handleDeletePhase = useCallback(({ id }: DeletePhaseInput) => deletePhase({ id }), [deletePhase]);
  const handleCreateItem = useCallback(
    ({ phase_id }: CreateItemInput) => createItem({ planId, phaseId: phase_id }),
    [createItem, planId]
  );
  const handleUpdateItem = useCallback(
    ({ id, is_complete, title }: Item) => updateItem({ id, isComplete: is_complete, title }),
    [updateItem]
  );
  const handleDeleteItem = useCallback(({ id }: DeleteItemInput) => deleteItem({ id }), [deleteItem]);

  const isLoading =
    isLoadingPlan ||
    isCreatingPhase ||
    isUpdatingPhase ||
    isDeletingPhase ||
    isCreatingItem ||
    isUpdatingItem ||
    isDeletingItem;
  const { plan, phases, items } = data || {};
  const { title: planTitle, max_phase_position } = plan || {};

  return (
    <div className={styles.startupChecklist}>
      <span className={styles.planTitle}>{planTitle}</span>
      <Checklist
        isLoading={isLoading}
        phases={phases || []}
        items={items || []}
        onCreatePhase={handleCreatePhase}
        onUpdatePhase={handleUpdatePhase}
        onDeletePhase={handleDeletePhase}
        onCreateItem={handleCreateItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
        maxPhasePosition={max_phase_position || undefined}
      />
    </div>
  );
};

export default StartupChecklist;
