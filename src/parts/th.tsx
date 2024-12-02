import styled from 'styled-components';
import { $movingColumnStore, $store, useStore } from '../store';
import { MouseEvent as ReactMouseEvent, useRef, useState } from 'react';

interface Props {
  columnIndex: number;
  isMirror: boolean;
}

const props = ['isMoving', 'size'];

const StyledTh = styled('th').withConfig({
  shouldForwardProp: (prop) => !props.includes(prop),
})<{ isMoving: boolean; size: number }>`
  position: relative;
  padding: 4px 8px;
  height: 32px;
  ${({ size }) => `
    width: ${size}px;
    max-width: ${size}px;
  `}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  cursor: pointer;

  ${({ isMoving }) =>
    isMoving &&
    `
  body {
  cursor: grab;}
`}

  & > span:hover {
    color: rgb(255, 255, 255);
  }
`;

const StyledResizer = styled('div')`
  position: absolute;
  top 0;
  right: -2px;
  z-index: 2;
  bottom: 0;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  display: inline-flex;
  justify-content: center;

  &::after {
    margin: 0 auto;
    content: '';
    width: 2px;
    background-color: #293c44;
  }
`;

const StyledBigResized = styled('div')`
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: #009ee3;
  will-change: left;
`;

export function Th({ columnIndex, isMirror }: Props) {
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const [isResizing, setIsResizing] = useState(false);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const { columns } = useStore([`columns[${columnIndex}]`]);
  const column = columns[columnIndex];

  const onClick = () => {
    function onMouseMove(e: MouseEvent) {
      $movingColumnStore.setKey('x', e.clientX);
      $movingColumnStore.setKey('y', e.clientY);
    }

    function onClickEnd() {
      $movingColumnStore.set({
        column: null,
        isActive: false,
        x: null,
        y: null,
      });
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = undefined;

        requestAnimationFrame(() => {
          const lastIndex = $store
            .get()
            .columns.findIndex(({ isSelected }) => isSelected);

          if (lastIndex !== -1 && lastIndex !== columnIndex) {
            $store.setKey(`columns[${lastIndex}]`, {
              ...$store.get().columns[lastIndex],
              isSelected: false,
            });
          }
          $store.setKey(`columns[${columnIndex}]`, {
            ...column,
            isSelected: !column.isSelected,
          });
        });
      }

      $store.setKey(`columns[${columnIndex}]`, { ...column, isMoving: false });
      document.removeEventListener('mouseup', onClickEnd);
      document.removeEventListener('mousemove', onMouseMove);
    }
    document.addEventListener('mouseup', onClickEnd);

    timerId.current = setTimeout(() => {
      $store.setKey(`columns[${columnIndex}]`, { ...column, isMoving: true });
      $movingColumnStore.setKey('column', column);
      $movingColumnStore.setKey('isActive', true);
      document.addEventListener('mousemove', onMouseMove);
      timerId.current = undefined;
    }, 800);
  };

  const onResize = (e: ReactMouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    const startX = e.clientX - column.size;
    let colWidth = column.size;
    setMouseX(e.clientX);

    function onMove(e: MouseEvent) {
      colWidth = Math.max(100, e.clientX - startX);
      requestAnimationFrame(() => setMouseX(e.clientX));
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', function onMouseUp() {
      setIsResizing(false);
      setMouseX(null);
      $store.setKey(`columns[${columnIndex}]`, { ...column, size: colWidth });
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onMouseUp);
    });
  };

  return (
    <>
      <StyledTh
        isMoving={column.isMoving}
        onMouseDown={onClick}
        size={column.size}
      >
        {((!column.isMoving || isMirror) && (
          <>
            <span>
              {column.title}
              {column.isPinned ? ' (L)' : ''}
            </span>
            <StyledResizer onMouseDown={onResize} />
          </>
        )) ||
          null}
      </StyledTh>
      {(isResizing && mouseX !== null && (
        <StyledBigResized style={{ left: `${mouseX}px` }} />
      )) ||
        null}
    </>
  );
}
