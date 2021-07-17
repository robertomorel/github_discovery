import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { CardsProps } from '../../types';

import { Card as CompCard } from './styles';

export const Card: React.FC<CardsProps> = ({
  propId,
  imageStr,
  header,
  price,
  beds,
  baths,
  address,
  zipCode,
  available,
  }) => {
  const history = useHistory()

  return (
    <CompCard data-testid='card-component'>
      <a
        key={propId}
        onClick={() => history.push(`/detail/${propId}`)}
        data-testid='card-component-link'>
        <div>
          <img src={require(`../../assets/${imageStr}`)} alt="Casa" />
            <div>
              <strong>{header}</strong>
              <span>{`Price: ${price}`}</span>

              <p>{`Beds: ${beds}`}</p>
              <p>{`Baths: ${baths}`}</p>
              <p>{`Adress: ${address}`}</p>
              <p>{`ZIP Code: ${zipCode}`}</p>
              {available ? (
                <p>Available: &nbsp;<b style={{ color: '#1B5E20' }}>YES</b></p>
              ) : (
                <p>Available: &nbsp;<b style={{ color: '#c53030' }}>NO</b></p>
              )}
            </div>

          <FiChevronRight size={20} name='moveFoward' />
        </div>
      </a>
    </CompCard>
  );
}
