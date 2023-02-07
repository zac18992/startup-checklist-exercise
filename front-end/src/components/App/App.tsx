import { ReactElement } from 'react';
import styles from './App.module.scss';
import StartupChecklist from 'components/StartupChecklist';
import ReactQuery from 'components/ReactQuery';

const App = (): ReactElement => {
  return (
    <ReactQuery>
      <div className={styles.app}>
        <StartupChecklist planId="8fe2450c-24c6-47c1-8d97-514b83f1ca31" />
      </div>
    </ReactQuery>
  );
};

export default App;
