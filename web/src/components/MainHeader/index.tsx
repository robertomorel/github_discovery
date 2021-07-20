import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import { Storage } from '../../utils/storage';
import imgProfile from '../../assets/github-logo.png';

import {
  Header,
  HeaderContent,
  Link,
  Menu,
  Profile,
} from './styles';
import { ActiveLink } from '../ActiveLink';

const localStoragePrefix = 'app_sweet_home#';

interface MainHeaderProps {
  hideMenu?: boolean;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ hideMenu }) => {
  const [user, setUser] = useState('');
  const history = useHistory()

  useEffect(() => {
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
  }, []);

  return (
    <Header data-testid='main-header-component'>
      <HeaderContent>
        <Profile hideMenu={hideMenu}>
          <img src={imgProfile} alt="Profile" />

          <div>
            <span>Welcome,</span>
            <strong data-testid="user_ip">{user}</strong>
          </div>
        </Profile>

        {hideMenu && (
          <button type="button" onClick={() => history.goBack()} name='goback'>
            <FiArrowLeft />
          </button>
        )}
      </HeaderContent>
      {!hideMenu && (
        <Menu>
          <nav>
            <ActiveLink activeClassName="/" to="/" onClick={() => history.push('/')}>
              <Link>Home</Link>
            </ActiveLink>
            <ActiveLink activeClassName="/listing" to="/listing" onClick={() => history.push('/listing')}>
              <Link>Listing</Link>
            </ActiveLink>
          </nav>
        </Menu>
      )}
    </Header>
  );
}

