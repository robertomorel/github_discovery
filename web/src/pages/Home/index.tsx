import React from 'react';
import { FiSearch } from 'react-icons/fi';
import * as Yup from 'yup';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns';
import { FormHandles } from '@unform/core';
import 'react-day-picker/lib/style.css';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { actionRequestProfile, useActionDispatch } from '../../store';
import { MainHeader, Spinner, SpinnerWrapper } from '../../components';
import { ProfileProps } from '../../types';
import { getProfiles } from '../../services/profile';

import * as Styles from './styles';
interface SearchFormData {
  search: string;
}

export const Home: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [newFeature, setNewFeature] = React.useState('');
  const formRef = React.useRef<FormHandles>(null);
  const { addToast } = useToast();
  const dispatch = useActionDispatch();
  const history = useHistory()

  const handlePropertySearch = React.useCallback(
    async (data: SearchFormData) => {
      try {
        setLoading(true);

        const profiles: ProfileProps[] = await getProfiles(data.search)
        dispatch(actionRequestProfile(profiles));

        addToast({
          type: 'success',
          title: 'Search successful!',
          description: 'Enjoy the profiles!',
        });

        history.push('/listing')

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  const selectedDateAsText = React.useMemo(() => {
    return format(new Date(), "MMMM dd'th'", {
      locale: enUS,
    });
  }, []);

  const selectedWeekDay = React.useMemo(() => {
    return format(new Date(), 'cccc', {
      locale: enUS,
    });
  }, []);

  return (
    <Styles.Container data-testid="home_page">
      <MainHeader />

      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Styles.Content>
          <Styles.Search>
            <h1>Find Your GitHub Profiles</h1>
            <p>
              <span>{selectedDateAsText}</span>
              <span>{selectedWeekDay}</span>
            </p>

            <Form ref={formRef} onSubmit={handlePropertySearch}>
              <Input
                name="search"
                value={newFeature}
                onChange={e => setNewFeature(e.target.value)}
                icon={FiSearch}
                placeholder="Find GitHub profiles"
              />
              <Button loading={loading} type="submit">
                Search
              </Button>
            </Form>
          </Styles.Search>
        </Styles.Content>
      )}
    </Styles.Container>
  );
};
