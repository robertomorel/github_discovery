import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 35px auto;
  padding-left: 35px;

  > h1 {
    font-size: 2rem;
    padding-bottom: 10px;
    line-height: 26px;
    border-bottom: 1px solid #fff;
    max-width: 90%;
  }

  > div {
    padding-top: 30px;
    display: flex;
  }
`;

export const SideLeft = styled.aside`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--gray-with-opacity);
  border-radius: 1rem;
  padding: 0.6rem;

  transition: 0.2s;
  cursor: pointer;

  &:hover {
    border: 2px solid ${shade(0.2, '#ff9f1c')};
  }
`;

export const MainImage = styled.div`
  img {
    width: 30rem;
  }
`;

export const ImageList = styled.div`
  margin-top: 1rem;
  display: grid;
  display: -ms-grid;
  grid-template-columns: 14.4rem 14.4rem;
  -ms-grid-columns: 14.4rem 14.4rem;

  grid-gap: 1.2rem 1.2rem;

  img {
    width: 14.4rem;
    height: 9rem;
  }
`;

export const SideRight = styled.aside`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  padding: 1.5rem 4rem 1.5rem 1.5rem;
  background-color: var(--gray-with-opacity);
  border-radius: 1rem;
  margin: 1rem 1rem 0 1.3rem;
  height: 100%;
`;

export const InformBox = styled.div`
  strong {
    font-size: 1.4rem;
    line-height: 26px;
    display: block;
    color: var(--gray-500);
    font-weight: 500;
  }

  span {
    color: var(--yellow-500);
    font-size: 1.1rem;
    line-height: 26px;
    border-bottom: 1px solid #ff9f1c;
    display: block;
    margin-bottom: 14px;
    margin-top: 14px;
  }

  p {
    line-height: 22px;
  }

  div + div {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 40px;
    margin-right: -2.1rem;

    a {
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        color: ${shade(0.2, '#ff9f1c')};
      }

      p {
        font-size: .8rem;
      }
    }
  }
`;
