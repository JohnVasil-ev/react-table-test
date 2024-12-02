import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { faker } from '@faker-js/faker';
import { TableWrapper, Table, ColumnMover } from './parts';
import { $store, useStore } from './store';
import { generateData, makeSid } from './utils';
import { Columns } from './types';

export default function App() {
  const timerId = useRef<ReturnType<typeof setInterval>>();
  const [isTimerActive, setIsTimerActive] = useState(true);

  const { columns, rows } = useStore(['columns', 'rows']);

  const onClick = useCallback(() => {
    function updateData() {
      const colId = columns.map(({ technicalName }) => technicalName)[
        faker.number.int({ min: 0, max: columns.length - 1 })
      ];
      const sid = makeSid(
        `TEST_${faker.number.int({ min: 0, max: rows.length - 1 })}`,
      );
      const newValue = generateData()[colId];
      $store.setKey(`data.${sid}.${colId}`, newValue);
    }
    for (let i = 0; i < faker.number.int({ min: 1, max: 5 }); ++i) {
      updateData();
    }
  }, [columns, rows]);

  function toggleActive() {
    setIsTimerActive((prev) => !prev);
  }

  useEffect(() => {
    if (!isTimerActive && timerId.current) {
      clearInterval(timerId.current);
      timerId.current = undefined;
    }
    if (isTimerActive && !timerId.current) {
      timerId.current = setInterval(onClick, 200);
    }
  }, [isTimerActive, onClick]);

  const [base, pinned] = useMemo(() => {
    const arr: [Columns, Columns] = [[], []];
    columns.forEach((col) => {
      arr[col.isPinned ? 1 : 0].push(col);
    });
    return arr;
  }, [columns]);

  return (
    <>
      <button onClick={toggleActive}>{isTimerActive ? 'Off' : 'On'}</button>
      <button onClick={onClick}>Update</button>
      <TableWrapper>
        {(pinned.length && (
          <Table columns={pinned} rows={rows} startIndex={0} />
        )) ||
          null}
        {(base.length && (
          <Table columns={base} rows={rows} startIndex={pinned.length} />
        )) ||
          null}
      </TableWrapper>
      <ColumnMover />
    </>
  );
}
