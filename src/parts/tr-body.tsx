import { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { $store, useStore } from '../store';

interface Props extends PropsWithChildren {
  rowIndex: number;
}

type StyledProps = {
  isHovered: boolean;
};

const props = ['row', 'isHovered'];

const StyledTrBody = styled('tr').withConfig({
  shouldForwardProp: (prop) => !props.includes(prop),
})<StyledProps>`
  ${({ isHovered }) =>
    isHovered &&
    `
    & > td {
    background-color: #36505B !important;
    color: rgb(255, 255, 255);
    }
  `}
`;

export function TrBody({ children, rowIndex }: Props) {
  const { hovers } = useStore([`hovers[${rowIndex}]`]);
  const isHovered = hovers[rowIndex];

  const onHover = (value: boolean) => () => {
    requestAnimationFrame(() => $store.setKey(`hovers[${rowIndex}]`, value));
  };

  return (
    <StyledTrBody
      isHovered={isHovered}
      onMouseEnter={onHover(true)}
      onMouseLeave={onHover(false)}
    >
      {children}
    </StyledTrBody>
  );
}
