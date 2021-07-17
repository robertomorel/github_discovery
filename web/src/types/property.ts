export interface OverviewProps {
  price?: number;
  beds?: number;
  baths?: number;
  neighborhood?: string;
  address?: string;
  city?: string;
  zipcode?: number;
  available?: 'T' | 'F';
};

export interface FactsProps {
  type?: 'Single Home' | 'Townhouse' | 'Apartment';
  yearBuilt?: number;
  heating?: string;
  parking?: string;
  lot?: string;
  stories?: number;
};

export interface OthersProps {
  anualTax?: number;
  hasGarage?: 'T' | 'F';
  pool?: 'T' | 'F';
  virtualTourLink?: string;
  parcelNumber?: number;
  lastSold?: Date;
};

export interface VisitsProps {
  total?: number;
  lastVisited?: Date;
};

export interface PropertyProps {
  id: string;
  homeImage?: string;
  images?: string;
  overview?: OverviewProps;
  facts?: FactsProps;
  others?: OthersProps;
  visits?: VisitsProps;
}
