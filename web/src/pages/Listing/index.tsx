import React, { useMemo } from 'react';
import 'react-day-picker/lib/style.css';

import { useSelector } from 'react-redux';
import { selectProperty } from '../../store';
import { CardsProps, WidgetsProps } from '../../types';
import { numberFormat, priceFormatter } from '../../utils/format';
import { MainHeader, Spinner, SpinnerWrapper, Widget, Card } from '../../components';

import {
  Container,
  Favorites,
  Content,
  Section,
  PropertiesContent,
} from './styles';

export const Listing: React.FC = () => {
  const { loading: loadingState, property, error } = useSelector(selectProperty);

  const favoriteProperties = useMemo(() => {
    if(property){
      // Arbitrary logic to choose the favorite places
      return [...property].filter(prop => prop.others?.pool === 'F').slice(0, 4).map(prop => {
        return {
          propId: prop.id,
          imageStr: prop.homeImage,
          price: priceFormatter.format(Number(prop.overview?.price)),
          views: numberFormat.format(Number(prop.visits?.total))
        }
      })
    }
  }, [property]) as WidgetsProps[] | undefined;

  const formattedProperties = useMemo(() => {
    if(property){
      return [...property].map(prop => {
        return {
          propId: prop.id,
          price: priceFormatter.format(Number(prop.overview?.price)),
          header: `${prop.overview?.city} - ${prop.overview?.neighborhood}`,
          beds: prop.overview?.beds,
          baths: prop.overview?.baths,
          address: prop.overview?.address,
          zipCode: prop.overview?.zipcode,
          available: prop.overview?.available === 'T',
          imageStr: prop.homeImage,
        }
      })
    }
  }, [property]) as CardsProps[] | undefined;

  return (
    <Container data-testid="listing_page">
      <MainHeader />

      {loadingState ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Content>
          <Favorites>
            <h1>Your favorite Homes</h1>

            <Section>
              {favoriteProperties?.length === 0 && <p>No homes found.</p>}

              {favoriteProperties && favoriteProperties.length !== 0 && (
                <PropertiesContent>
                  {favoriteProperties.map((prop, index) => (
                    <Widget
                      key={index}
                      imageStr={prop.imageStr}
                      price={prop.price}
                      propId={prop.propId}
                      views={prop.views}
                    />
                  ))}
                </PropertiesContent>
              )}
            </Section>
            <hr />
            <Section>
              <strong>List of Homes</strong>
              {formattedProperties &&
               formattedProperties.length !== 0 &&
               formattedProperties.map((prop, index) => (
                <Card
                  key={index}
                  propId={prop.propId}
                  price={prop.price}
                  header={prop.header}
                  beds={prop.beds}
                  baths={prop.baths}
                  address={prop.address}
                  zipCode={prop.zipCode}
                  available={prop.available}
                  imageStr={prop.imageStr}
                />
              ))}
            </Section>
          </Favorites>
        </Content>
      )}
    </Container>
  );
};
