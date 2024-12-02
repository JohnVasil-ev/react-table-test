import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledTableWrapper = styled.div`
  display: flex;
  gap: 8px;
  color: rgb(200, 200, 200);
  overflow: hidden;
`;

export function TableWrapper({ children }: PropsWithChildren) {
  return <StyledTableWrapper>{children}</StyledTableWrapper>;
}
