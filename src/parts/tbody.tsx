import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledTbody = styled.tbody`
  & > tr:nth-child(odd) {
    background-color: #182328;
  }
  & > tr:nth-child(even) {
    background-color: #1b282d;
  }
`;

export function Tbody({ children }: PropsWithChildren) {
  return <StyledTbody>{children}</StyledTbody>;
}
