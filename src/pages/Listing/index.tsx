import React from 'react';
import 'react-day-picker/lib/style.css';
import { useSelector } from 'react-redux';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

import { selectProfile } from '../../store';
import { MainHeader, Spinner, SpinnerWrapper, Card } from '../../components';
import { usersPerPage } from '../../types';

import * as Styles from './styles';
import './pagination.css';

interface ChangePageProps {
  selected: number;
}

export const Listing: React.FC = () => {
  const { loading: loadingState, profile } = useSelector(selectProfile);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [isIncreasing, setIsIncreasing] = React.useState(true);
  const [profileList, setProfileList] = React.useState(profile);

  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = profileList ? Math.ceil(profileList.length / usersPerPage) : 0;

  const changePage = ({ selected }: ChangePageProps) => {
    setPageNumber(selected)
  }

  const displayUsers = profileList?.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((prop, index) => (
      <Card
        key={index}
        login={prop.login}
        type={prop.type}
        avatar_url={prop.avatar_url}
      />
    ))

  const handleOrder = React.useCallback(async () => {
    if (loadingState || !profile) {
      return;
    }

    let sortedProfiles = [...profile];

    if (isIncreasing) {
      sortedProfiles.sort((a,b) => a.login.localeCompare(b.login));
    } else {
      sortedProfiles.sort((a,b) => b.login.localeCompare(a.login));
    }

    setProfileList([...sortedProfiles]);
    setIsIncreasing(!isIncreasing);

  }, [loadingState, isIncreasing, profile]);

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

              <button type="button" onClick={handleOrder}>
                {isIncreasing ? <FiArrowDown /> : <FiArrowUp />}
              </button>

              {displayUsers}

              <Styles.Paginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                pageRangeDisplayed={0}
                marginPagesDisplayed={2}
              />
            </Styles.Section>
          </Styles.Favorites>
        </Styles.Content>
      )}
    </Styles.Container>
  );
};
