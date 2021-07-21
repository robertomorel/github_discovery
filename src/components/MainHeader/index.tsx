import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { Storage } from '../../utils/storage';
import imgProfile from '../../assets/github-logo.png';

import * as Styles from './styles';
import { ActiveLink } from '../ActiveLink';
import { selectProfile } from '../../store';
import { localStoragePrefix } from '../../types';

interface MainHeaderProps {
  hideMenu?: boolean;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ hideMenu }) => {
  const [user, setUser] = React.useState('');
  const history = useHistory();
  const { loading, profile, error } = useSelector(selectProfile);

  React.useEffect(() => {
    const getUserFromStorage = async () => {
      const storagedUser = await Storage.get(localStoragePrefix+'user');
      if (storagedUser) setUser(storagedUser);
    }

    getUserFromStorage();

    if(!user) {
      axios
        .get('https://api.ipify.org/?format=jsonp?callback=?')
        .then(async response => {
          setUser(response.data);
          await Storage.set(localStoragePrefix+'user', response.data);
        });
      }
  }, [user]);

  return (
    <Styles.Header data-testid='main-header-component'>
      <Styles.HeaderContent>
        <Styles.Profile hideMenu={hideMenu}>
          <img src={imgProfile} alt="Profile" />

          <div>
            <span>Welcome,</span>
            <strong data-testid="user_ip">{user}</strong>
          </div>
        </Styles.Profile>

        {hideMenu && (
          <button type="button" onClick={() => history.goBack()} name='goback'>
            <FiArrowLeft />
          </button>
        )}
      </Styles.HeaderContent>
      {!hideMenu && (
        <Styles.Menu>
          <nav>
            <ActiveLink activeClassName="/" to="/" onClick={() => history.push('/')}>
              <Styles.Link>Home</Styles.Link>
            </ActiveLink>
            {!error && !loading && profile && (
              <ActiveLink activeClassName="/listing" to="/listing" onClick={() => history.push('/listing')}>
                <Styles.Link>Listing</Styles.Link>
              </ActiveLink>
            )}
          </nav>
        </Styles.Menu>
      )}
    </Styles.Header>
  );
}

