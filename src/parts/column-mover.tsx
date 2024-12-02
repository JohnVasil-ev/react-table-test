import styled from 'styled-components';
import { useMovingStore, useStore } from '../store';
import { Table } from './table';

const StyledColumnMover = styled('div')`
  position: absolute;
  z-index: 2;
`;

export function ColumnMover() {
  const { rows, columns } = useStore(['rows', 'columns']);
  const { isActive, column, x, y } = useMovingStore();

  return (
    (isActive && column && x !== null && y !== null && (
      <StyledColumnMover style={{ top: `${y}px`, left: `${x}px` }}>
        <Table
          columns={[column]}
          rows={rows}
          startIndex={columns.findIndex(({ id }) => id === column.id)}
          isMirror
        />
      </StyledColumnMover>
    )) ||
    null
  );
}
