import type { NextPage } from 'next';
import type { FormEvent } from 'react';
import { trpc } from '../utils/trpc';
import styles from '../index.module.scss';

const Index: NextPage = () => {
  const { data, isLoading, isError, refetch } = trpc.useQuery([
    'getTasksFromDB',
  ]);

  const { mutate: makeNewTask } = trpc.useMutation('makeTask');

  const { mutate: removeTask } = trpc.useMutation('removeTask');

  const { mutate: markTaskDone } = trpc.useMutation('markTaskDone');

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const target = e.target as typeof e.target & {
      task: { value: string };
    };

    makeNewTask(
      { task: target.task.value },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div className={styles.page}>
      <form onSubmit={submitForm}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            name="task"
            placeholder="Enter a task that needs to be done"
          />
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul>
        {!isLoading &&
          !isError &&
          data &&
          data.map((item) => (
            <li
              key={item.id}
              style={{ textDecoration: item.isDone ? 'line-through' : '' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <button onClick={() => removeTask({ taskId: item.id })}>
                  X
                </button>
                {item.task}
                <button onClick={() => markTaskDone({ taskId: item.id })}>
                  Mark Done
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Index;
