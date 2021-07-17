import styled from 'styled-components';
import { shade } from 'polished';

export const PropertyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5px 10px 10px 10px;
  background-color: var(--gray-870);

  img {
    width: 9rem;
    height: 6rem;
    margin-bottom: 5px;
  }

  border: 2px solid var(--gray-830);
  border-radius: 3px;

  &:hover {
    border: 2px solid ${shade(0.2, '#ff9f1c')};
    //cursor: pointer;
  }

  > span {
    font-weight: 500;
  }

  > p {
    font-size: 0.9rem;
  }
`;
