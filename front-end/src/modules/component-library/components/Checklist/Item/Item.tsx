import { ReactElement, useCallback } from 'react';
import styles from './Item.module.scss';
import classNames from 'classnames';

interface Props {
  title?: string;
  isComplete?: boolean;
  isLoading?: boolean;
  taskCompletionIsDisabled?: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateComplete: (is_complete: boolean) => void;
  onDelete: () => void;
}

const Item = ({
  title = '',
  isLoading = false,
  taskCompletionIsDisabled = false,
  isComplete = false,
  onUpdateComplete,
  onUpdateTitle,
  onDelete,
}: Props): ReactElement => {
  const handleClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      onUpdateComplete(e.target.checked);
    },
    [onUpdateComplete]
  );

  const handleChangeTitle = (e: React.FormEvent<HTMLSpanElement>): void =>
    onUpdateTitle(e.currentTarget.textContent || '');

  return (
    <div className={styles.checklistItem}>
      <input
        className={classNames(styles.itemStatus, {
          [styles.isDisabled]: taskCompletionIsDisabled,
          [styles.isLoading]: isLoading,
        })}
        type="checkbox"
        checked={!!isComplete}
        onChange={handleClick}
        disabled={taskCompletionIsDisabled}
      />
      <span
        className={styles.itemTitle}
        contentEditable={!isLoading}
        data-placeholder="To do item..."
        onInput={handleChangeTitle}
      >
        {title}
      </span>
      <button className={styles.deleteButton} onClick={onDelete}>
        X
      </button>
    </div>
  );
};

export default Item;
