import React from 'react'

import { SpinnerProps } from '../../types'

import { StyledSpinner } from './styles'

export const Spinner: React.FC<SpinnerProps> = ({ 'data-testid': dataTestId, ...props }) => (
  <StyledSpinner data-testid={dataTestId || 'app-spinner'} {...props} />
);

export { SpinnerWrapper } from './styles';
