import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ProfileProps } from '../../types';

import { Card as CompCard } from './styles';

interface CardProps extends ProfileProps {
  key: number;
}

export const Card: React.FC<CardProps> = ({
  key,
  login,
  type,
  avatar_url,
  }) => {

  return (
    <CompCard data-testid='card-component'>
      <Link
        key={key}
        to={{ pathname: `https://github.com/${login}` }}
        target="_blank"
        data-testid='card-component-link'>
        <div>
          <img src={avatar_url} alt="Avatar" />
          <div>
            <strong>{type}</strong>
            <span>{`User name:  ${login}`}</span>
          </div>
          <FiCheck size={20} name='moveFoward' />
        </div>
      </Link>
    </CompCard>
  );
}
