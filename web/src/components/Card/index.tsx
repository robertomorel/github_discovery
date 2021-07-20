import React from 'react';
import { FiCheck } from 'react-icons/fi';
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
      <div
        key={key}
        data-testid='card-component-link'>
        <div>
          <img src={avatar_url} alt="Avatar" />
            <div>
              <strong>{type}</strong>
              <span>{`Name: ${login}`}</span>
            </div>
          <FiCheck size={20} name='moveFoward' />
        </div>
      </div>
    </CompCard>
  );
}
