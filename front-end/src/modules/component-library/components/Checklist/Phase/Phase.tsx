import styles from './Phase.module.scss';
import classNames from 'classnames';
import { ReactElement } from 'react';

interface Props {
  title?: string;
  isLoading?: boolean;
  isComplete?: boolean;
  isUnlocked?: boolean;
  items?: ReactElement[];
  onTitleChange: (title: string) => void;
  onDelete: () => void;
  onAddItem: () => void;
}

const Phase = ({
  title = '',
  isLoading = false,
  isComplete = false,
  isUnlocked = true,
  items = [],
  onTitleChange,
  onDelete,
  onAddItem,
}: Props) => {
  return (
    <div className={styles.checklistPhase}>
      <div className={styles.phaseHeader}>
        <span
          className={styles.phaseTitle}
          contentEditable={!isLoading}
          data-placeholder="Startup phase title..."
          onInput={(e: React.FormEvent<HTMLSpanElement>): void => onTitleChange(e.currentTarget.textContent || '')}
        >
          {title}
        </span>
        <span
          className={classNames(styles.phaseStatus, {
            [styles.isComplete]: isComplete,
            [styles.isLocked]: !isUnlocked,
          })}
        >
          {isUnlocked ? (isComplete ? 'complete' : 'in progress') : 'locked'}
        </span>
        <button className={styles.deleteButton} onClick={onDelete}>
          X
        </button>
      </div>
      <div className={styles.checklistItems}>
        {items}
        <button className={styles.addItemButton} onClick={onAddItem}>
          +
        </button>
      </div>
    </div>
  );
};

export default Phase;
