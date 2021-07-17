import { gql } from 'apollo-boost';

export const GET_ALL_PROPERTIES = gql`
  query {
    getProperties {
      id
      homeImage
      images
      facts {
        type
        yearBuilt
        heating
        parking
        lot
        stories
      }
      overview {
        price
        beds
        baths
        neighborhood
        address
        city
        zipcode
        available
      }
      others {
        anualTax
        hasGarage
        pool
        virtualTourLink
        parcelNumber
        lastSold
      }
      visits {
        total
        lastVisited
      }
    }
  }
`;
