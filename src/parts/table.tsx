import styled from 'styled-components';

import { Columns, Rows } from '../types';
import { Thead, TrHead, Th, Tbody, TrBody, Td } from '.';

interface Props {
  columns: Columns;
  rows: Rows;
  startIndex: number;
  isMirror?: boolean;
}

const StyledTable = styled.table`
  table-layout: fixed;
  border-collapse: separate;
  border: 1px solid #293c44;
  border-spacing: 2px 0;
`;

export function Table({ columns, rows, startIndex, isMirror = false }: Props) {
  return (
    <StyledTable>
      <Thead>
        <TrHead>
          {columns.map((column, index) => (
            <Th
              key={column.id}
              isMirror={isMirror}
              columnIndex={index + startIndex}
            />
          ))}
        </TrHead>
      </Thead>

      <Tbody>
        {rows.map((row, rowIndex) => (
          <TrBody key={row.id} rowIndex={rowIndex}>
            {columns.map((column, columnIndex) => (
              <Td
                key={`${row.id}_${column.id}`}
                isMirror={isMirror}
                rowIndex={rowIndex}
                columnIndex={columnIndex + startIndex}
              />
            ))}
          </TrBody>
        ))}
      </Tbody>
    </StyledTable>
  );
}
