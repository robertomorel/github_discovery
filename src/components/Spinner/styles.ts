import styled, { keyframes } from 'styled-components'

import { SpinnerProps } from '../../types'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const StyledSpinner = styled.div<SpinnerProps>`
  border: ${props => props.borderSize || 10}px solid transparent;
  border-top: ${props => props.borderSize || 10}px solid var(--yellow-500);
  border-right: ${props => props.borderSize || 10}px solid var(--yellow-500);
  border-radius: 50%;
  width: ${props => (props.radius || 30) * 2}px;
  height: ${props => (props.radius || 30) * 2}px;
  animation: ${spin} ${props => props.duration || 0.5}s linear infinite;
`

export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
`
