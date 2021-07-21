import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--gray-870);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  height: 56px;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  border: 2px solid var(--gray-870);
  color: var(--gray-500);

/* Regra para a borda ficar vermelha caso exista erro no campo */
${props =>
  props.isErrored &&
  css`
    border-color: var(--red-300);
  `}

/* Regra para o container ficar laranja caso o input esteja em foco. */
  ${props =>
    props.isFocused &&
    css`
      border-color: var(--yellow-500);
      color: var(--yellow-500);
    `}

  /* Regra para o ícone também ficar laranja caso o campo esteja preenchido. */
  ${props =>
    props.isFilled &&
    css`
      color: var(--yellow-500);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--gray-30);

    &::placeholder {
      color: var(--gray-500);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: var(--red-300);
    color: var(--white);

    &::before {
      border-color: var(--red-300);
    }
  }
`;
