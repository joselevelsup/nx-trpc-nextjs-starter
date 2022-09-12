import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import styles from './index.module.scss';

const Index: NextPage = () => {
  const { data, isLoading, isError } = trpc.useQuery([
    'forAll',
    { name: 'Glenn Quagmire' },
  ]);

  return (
    <div className={styles.page}>
      {!isLoading && !isError ? data : 'Loading...'}
    </div>
  );
};

export default Index;
