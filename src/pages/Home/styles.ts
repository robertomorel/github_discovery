import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 35px auto;
  padding-left: 35px;
  display: flex;
`;

export const Search = styled.div`
  flex: 1;
  margin-right: 120px;
  position: relative;

  h1 {
    font-size: 2rem;
  }

  p {
    margin-top: 8px;
    color: var(--yellow-500);
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: var(--yellow-500);
      margin: 0 8px;
    }
  }

  form {
    margin: 10px 0;
    flex: 1;

    display: flex;
    align-items: center;

    > input {
      width: 800px;
    }

    > button {
      width: 180px;
      margin-left: 16px;
    }

    @media (max-width: 425px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      > button {
        width: 130px;
        margin-top: 10px;
        margin-left: 0;
        height: 44px;
      }

      > div {
        height: 44px;
      }
    }
  }

  > button {
    position: absolute;
    margin-top: 20px;
    right: 5px;
    background: transparent;
    border: 0;
    color: var(--gray-830);

    svg {
      width: 20px;
      height: 20px;
      transition: 0.2s;
    }

    &:hover {
      color: ${shade(0.2, '#ff9f1c')};
    }
  }
`;
