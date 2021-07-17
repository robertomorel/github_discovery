import styled from 'styled-components';
import { shade } from 'polished';

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & + div {
    margin-top: 16px;
  }

  a {
    text-decoration: none;
    width: 97%;
    cursor: pointer;

    div {
      flex: 1;
      background-color: var(--gray-with-opacity);
      display: flex;
      align-items: center;
      padding: 10px 24px;
      border-radius: 10px;
      margin-right: 10px;

      img {
        width: 16rem;
        height: 12.9rem;
        border-radius: 10px;
      }

      div {
        margin-left: 24px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        strong {
          color: #fff;
          font-size: 25px;
        }

        p::before {
          content: '';
          width: 1px;
          height: 12px;
          background: #ff9f1c;
          margin: 0 6px;
        }

        p {
          margin-left: 8px;
          font-size: 15px;
        }
      }

      svg {
        color: #fff;
        width: 20px;
        height: 20px;
        transition: 0.2s;
      }

      &:hover {
        svg {
          color: ${shade(0.2, '#ff9f1c')};
        }
      }
    }

    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }
  }
`;
