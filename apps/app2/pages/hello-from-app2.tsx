import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import styles from './index.module.scss';

const Index: NextPage = () => {
  const { data, isLoading, isError } = trpc.useQuery(['todosFromApp2']);

  return (
    <div className={styles.page}>
      {!isLoading && !isError && data && (
        <ul>
          {data.map((item) => (
            <li
              style={{ textDecoration: item.isDone ? 'line-through' : '' }}
              key={item.id}
            >
              {item.task}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Index;
