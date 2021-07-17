import React, { useEffect, useMemo, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectProperty } from '../../store';
import { CardsProps, PropertyProps, WidgetsProps } from '../../types';
import { numberFormat, priceFormatter } from '../../utils/format';
import { MainHeader, Spinner, SpinnerWrapper, Widget, Card, MyVerticallyCenteredModal } from '../../components';
import { formatToLocaleDateString } from '../../utils/date';

import {
  Container,
  Content,
  ImageList,
  InformBox,
  MainImage,
  SideLeft,
  SideRight,
} from './styles';

export const Detail: React.FC = () => {
  const { loading: loadingState, property, error } = useSelector(selectProperty);
  const { propertyId } = useParams<{ propertyId: string }>()
  const [showMore, setShowMore] = useState(false);
  const [chosenProperty, setChosenProperty] = useState<PropertyProps | undefined>(undefined);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    if(property && propertyId) {
      const foundProperty = property.find(prop => prop.id === propertyId)
      if (foundProperty){
        setChosenProperty({...foundProperty});
      }
    }
  }, [property, propertyId])

  const imageList = useMemo(() => {
    return chosenProperty?.images?.split(';').splice(0,10);
  }, [chosenProperty]);

  return (
    <Container data-testid="detail_page">
      <MainHeader hideMenu={true}/>

      {(loadingState || !chosenProperty) ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Content>
          {
            /** @todo
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            */
          }
          <h1>Property Details</h1>

          <div>
            <SideLeft onClick={() => setModalShow(true)}>
              <MainImage>
                <img src={require(`../../assets/${chosenProperty.homeImage}`)} alt="header" />
              </MainImage>
              <ImageList>
                {imageList && imageList.map((img, index) => (
                  <img
                    key={index}
                    src={require(`../../assets/${img}`)}
                    alt="details"
                  />
                ))}
              </ImageList>
            </SideLeft>
            <SideRight>
              <InformBox>
                <div>
                  <strong>Property Information</strong>

                  <span>Overview</span>

                  <p>{`Price: ${priceFormatter.format(Number(chosenProperty.overview?.price))}`}</p>
                  <p>{`Neighborhood: ${chosenProperty.overview?.neighborhood}`}</p>
                  <p>{`Beds: ${chosenProperty.overview?.beds}`}</p>
                  <p>{`Baths: ${chosenProperty.overview?.baths}`}</p>
                  <p>{`Adress: ${chosenProperty.overview?.address}`}</p>
                  <p>{`ZIP Code: ${chosenProperty.overview?.zipcode}`}</p>
                  {chosenProperty.overview?.available ? (
                    <p>Available: &nbsp;<b style={{ color: '#1B5E20' }}>YES</b></p>
                  ) : (
                    <p>Available: &nbsp;<b style={{ color: '#c53030' }}>NO</b></p>
                  )}

                  <span>Facts and Features</span>

                  <p>{`Type: ${chosenProperty.facts?.type}`}</p>
                  <p>{`Year Built: ${chosenProperty.facts?.yearBuilt}`}</p>
                  <p>{`Heating: ${chosenProperty.facts?.heating}`}</p>
                  <p>{`Parking: ${chosenProperty.facts?.parking}`}</p>
                  <p>{`Lot: ${chosenProperty.facts?.lot}`}</p>
                  <p>{`Stories: ${chosenProperty.facts?.stories}`}</p>

                  {showMore && (
                    <>
                      <span>Others</span>

                      <p>{`Anual Tax: ${chosenProperty.others?.anualTax}`}</p>
                      <p>{`Has Garage: ${chosenProperty.others?.hasGarage}`}</p>
                      <p>{`Pool: ${chosenProperty.others?.pool}`}</p>
                      <p>{`Virtual Tour Link: ${chosenProperty.others?.virtualTourLink}`}</p>
                      <p>{`Parcel Number: ${chosenProperty.others?.parcelNumber}`}</p>
                      <p>{`Last Sold: ${chosenProperty.others?.lastSold}`}</p>

                      <span>Visits</span>

                      <p>{`Total: ${chosenProperty.visits?.total}`}</p>
                      <p>{`Last Visited: ${
                        chosenProperty.visits?.lastVisited ?
                        formatToLocaleDateString(new Date(chosenProperty.visits.lastVisited)) :
                        new Date().toLocaleDateString()
                      }`}</p>
                    </>
                  )}

                </div>
                <div>
                  <a onClick={() => setShowMore(!showMore)}>
                    <p>
                      {showMore ? 'Show less...' : 'Show more...'}
                    </p>
                  </a>
                </div>
              </InformBox>
            </SideRight>
          </div>
        </Content>
      )}
    </Container>
  );
};
