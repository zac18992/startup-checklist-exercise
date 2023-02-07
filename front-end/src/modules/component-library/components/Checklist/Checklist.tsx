import { ReactElement, useCallback } from 'react';
import styles from './Checklist.module.scss';
import ItemComponent from './Item';
import debounce from 'lodash.debounce';
import PhaseComponent from './Phase';
import type { Phase } from 'generated/gql/schema';
import type { Item } from 'generated/gql/schema';

interface Props {
  isLoading?: boolean;
  phases?: Phase[];
  items?: Item[];
  onCreatePhase: () => void;
  onUpdatePhase: ({ id, title }: { id: string; title: string }) => void;
  onDeletePhase: ({ id }: IDObj) => void;
  onCreateItem: ({ phase_id }: { phase_id: string }) => void;
  onUpdateItem: ({ id, title, is_complete }: { id: string; title?: string; is_complete?: boolean }) => void;
  onDeleteItem: ({ id }: IDObj) => void;
  maxPhasePosition?: number;
}

const Checklist = ({
  isLoading = false,
  phases = [],
  items = [],
  onCreatePhase,
  onUpdatePhase,
  onDeletePhase,
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
  maxPhasePosition = 1,
}: Props): ReactElement => {
  const handleUpdateItem = useCallback(
    debounce(({ id, title }: UpdateItemTitleInput): void => {
      onUpdateItem({ id, title: title });
    }, 1500),
    [onUpdateItem]
  );

  const handleClickCreatePhase = useCallback((): void => {
    onCreatePhase();
  }, [onCreatePhase]);

  const handleClickDeletePhase = useCallback(({ id }: DeletePhaseInput) => onDeletePhase({ id }), [onDeletePhase]);

  const handleClickAddItem = useCallback(
    ({ phase_id }: CreateItemInput): void => {
      onCreateItem({ phase_id });
    },
    [onCreateItem]
  );

  const handleClickItemComplete = useCallback(
    ({ id, is_complete }: UpdateItemCompleteInput): void => {
      onUpdateItem({ id, is_complete });
    },
    [onUpdateItem]
  );

  const handleUpdatePhase = useCallback(
    debounce(({ id, title }: UpdatePhaseTitleInput): void => {
      onUpdatePhase({ id, title });
    }, 1500),
    [onUpdatePhase]
  );

  const handleClickDeleteItem = useCallback(({ id }: DeleteItemInput) => onDeleteItem({ id }), [onDeleteItem]);

  return (
    <div className={styles.checklist}>
      {phases?.map(({ id: phase_id, title, is_complete: isComplete, position }) => {
        const phaseItems: Item[] = items?.filter((item) => !!item.id && item.phase_id === phase_id);
        const isUnlocked = (position || 0) <= maxPhasePosition;

        return (
          <PhaseComponent
            key={phase_id}
            title={title || ''}
            isLoading={isLoading}
            isComplete={!!isComplete}
            isUnlocked={isUnlocked}
            onTitleChange={(title) => handleUpdatePhase({ id: phase_id, title })}
            onDelete={() => handleClickDeletePhase({ id: phase_id })}
            onAddItem={() => handleClickAddItem({ phase_id })}
            items={phaseItems?.map((item) => (
              <ItemComponent
                isLoading={isLoading}
                key={item.id}
                isComplete={!!(isUnlocked ? item.is_complete : false)}
                title={item.title || ''}
                taskCompletionIsDisabled={!isUnlocked}
                onUpdateTitle={(title: string) => handleUpdateItem({ id: item.id, title })}
                onUpdateComplete={(is_complete: boolean) => handleClickItemComplete({ id: item.id, is_complete })}
                onDelete={() => handleClickDeleteItem({ id: item.id })}
              />
            ))}
          />
        );
      })}
      <button className={styles.addPhaseButton} onClick={handleClickCreatePhase}>
        +
      </button>
    </div>
  );
};

export default Checklist;
