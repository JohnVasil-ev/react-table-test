import styled from 'styled-components';

import { useTableValue } from '../hooks';
import { $store, useStore } from '../store';

interface Props {
  rowIndex: number;
  columnIndex: number;
  isMirror: boolean;
}

const props = ['isSelected', 'size'];

const StyledTd = styled('td').withConfig({
  shouldForwardProp: (prop) => !props.includes(prop),
})<{ size: number; isSelected: boolean }>`
  padding: 4px 8px;
  height: 24px;
  ${({ size }) => `
    width: ${size}px;
    max-width: ${size}px;
  `}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: #36505B !important;
    color: rgb(255, 255, 255);
  `}
`;

export function Td({ rowIndex, columnIndex, isMirror }: Props) {
  const { rows, columns } = useStore([
    `rows[${rowIndex}]`,
    `columns[${columnIndex}]`,
  ]);
  const row = rows[rowIndex];
  const column = columns[columnIndex];

  const value = useTableValue(row.sid, column.technicalName);

  const onClick = () => {
    requestAnimationFrame(() =>
      $store.setKey(`rows[${rowIndex}]`, {
        ...row,
        isSelected: !row.isSelected,
      }),
    );
  };

  return (
    <StyledTd
      size={column.size}
      isSelected={row.isSelected || column.isSelected}
      onClick={onClick}
    >
      {((!column.isMoving || isMirror) && value) || null}
    </StyledTd>
  );
}
