import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { deepMap } from 'nanostores';
import { useStore } from '@nanostores/react';

import { faker } from '@faker-js/faker';
import { PropsWithChildren, useEffect } from 'react';

interface ColData {
  firstName: string;
  lastName: string;
  age: number;
}

const accessors: Array<keyof ColData> = ['firstName', 'lastName', 'age'];

function generateData(): ColData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(),
  };
}

const defaultData: Array<ColData> = Array.from({ length: 10 }).map(
  generateData,
);

const colHelper = createColumnHelper<ColData>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultColumns: Array<ColumnDef<ColData, any>> = accessors.map(
  (accessor) =>
    colHelper.accessor(accessor, {
      header(props) {
        return props.column.id;
      },
      cell(props) {
        return <Cell>{props.getValue()}</Cell>;
      },
    }),
);

function getRandomInts(count: number = 3, min: number = 0, max: number = 9) {
  const ints: Array<number> = [];
  for (let i = 0; i < count; ++i) {
    let int = faker.number.int({ min, max });
    while (ints.includes(int)) {
      int = faker.number.int({ min, max });
    }
    ints.push(int);
  }
  return ints;
}

const $store = deepMap({
  columns: defaultColumns,
  data: defaultData,
});

function Cell({ children }: PropsWithChildren) {
  return <span>{children}</span>;
}

export default function App() {
  const { columns, data } = useStore($store, {
    keys: ['columns', 'data'],
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      const newOne = [...$store.get().data];
      for (const int of getRandomInts(5)) {
        newOne.splice(int, 1, generateData());
      }
      $store.setKey('data', newOne);
    }, 1500);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const table = useReactTable<ColData>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
