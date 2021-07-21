import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: var(--yellow-500);
  height: 54px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: var(--gray-850);
  width: 100%;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
