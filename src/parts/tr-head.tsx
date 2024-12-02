import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledTrHead = styled.tr`
  user-select: none;
`;

export function TrHead({ children }: PropsWithChildren) {
  return <StyledTrHead>{children}</StyledTrHead>;
}
