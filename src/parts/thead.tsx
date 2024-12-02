import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledThead = styled.thead``;

export function Thead({ children }: PropsWithChildren) {
  return <StyledThead>{children}</StyledThead>;
}
