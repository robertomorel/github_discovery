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

export interface WidgetsProps {
  propId: string;
  imageStr: string;
  price: string;
  views: string;
}

export interface CardsProps {
  propId: string;
  price: string;
  header: string;
  beds: number;
  baths: number;
  address: string;
  zipCode: string;
  available: boolean;
  imageStr: string;
}
