import React from 'react';
import 'react-day-picker/lib/style.css';
import { useSelector } from 'react-redux';

import { selectProfile } from '../../store';
import { MainHeader, Spinner, SpinnerWrapper, Card } from '../../components';

import * as Styles from './styles';

export const Listing: React.FC = () => {
  const { loading: loadingState, profile, error } = useSelector(selectProfile);

  return (
    <Styles.Container data-testid="listing_page">
      <MainHeader />

      {loadingState ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Styles.Content>
          <Styles.Favorites>
            <Styles.Section>
              <strong>List of Profiles</strong>
              {profile &&
               profile.length !== 0 &&
               profile.map((prop, index) => (
                <Card
                  key={index}
                  login={prop.login}
                  type={prop.type}
                  avatar_url={prop.avatar_url}
                />
              ))}
            </Styles.Section>
          </Styles.Favorites>
        </Styles.Content>
      )}
    </Styles.Container>
  );
};
