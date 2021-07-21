export interface GenericComponentProps {
  id?: string
}

export interface TestableComponentProps {
  'data-testid'?: string
}

export interface SpinnerProps extends TestableComponentProps {
  radius?: number // pixels
  borderSize?: number // pixels
  duration?: number // seconds
}
