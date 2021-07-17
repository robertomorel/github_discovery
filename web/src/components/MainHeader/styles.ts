import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  padding-top: 32px;
  background: var(--gray-850);
`;

export const HeaderContent = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  button {
    margin: 0 50px 50px auto;
    background: transparent;
    border: 0;
    color: #999591;

    svg {
      width: 1.6rem;
      height: 1.6rem;
      transition: 0.2s;
    }

    &:hover {
      color: ${shade(0.2, '#ff9f1c')};
    }
  }
`;

interface ProfileProps {
  hideMenu?: boolean;
}

export const Profile = styled.div<ProfileProps>`
  display: flex;
  align-items: center;
  margin-left: 50px;
  padding-bottom: ${props => (props.hideMenu && 70)}px;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
    line-height: 24px;

    > span {
      color: var(--white);
      font-size: 1.5rem;
      margin-bottom: 3px;

    }

    > strong {
      color: var(--yellow-500);
      font-size: 1.1rem;
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  nav {
    margin-left: 5rem;
    height: 5rem;

    a {
      display: inline-block;
      position: relative;
      padding: 0 0.5rem;
      height: 5rem;
      line-height: 5rem;
      color: var(--gray-300);
      transition: color 0.2s;

      & + a {
        margin-left: 2rem;
      }

      &:hover {
        color: var(--white);
      }
    }
  }
`;

interface LinkProps {
  active?: boolean;
}

export const Link = styled.a<LinkProps>`
  ${props => props.active && css`
    && {
      color: var(--white);
      font-weight: bold;
    }

    &&:after {
        content: '';
        height: 3px;
        border-radius: 3px 3px 0 0;
        width: 100%;
        position: absolute;
        bottom: 1px;
        left: 0;
        background: var(--yellow-500);
      }
    }
  `}
`;
