import React from 'react';
import { FiSearch } from 'react-icons/fi';
import * as Yup from 'yup';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns';
import { FormHandles } from '@unform/core';
import 'react-day-picker/lib/style.css';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { actionRequestProfile, selectProfile, useActionDispatch } from '../../store';
import { MainHeader, Spinner, SpinnerWrapper } from '../../components';
import { localStoragePrefix, ProfileProps } from '../../types';
import { getProfiles } from '../../services/profile';
import { Storage } from '../../utils/storage';

import * as Styles from './styles';

interface SearchFormData {
  search: string;
}

export const Home: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const formRef = React.useRef<FormHandles>(null);
  const { addToast } = useToast();
  const dispatch = useActionDispatch();
  const history = useHistory();
  const { profile } = useSelector(selectProfile);

  const handlePropertySearch = React.useCallback(
    async (data: SearchFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});
        // -- Criando um schema de validação. Usado quando queremos validar um objeto inteiro.
        const schema = Yup.object().shape({
          search: Yup.string().required('Required field.').min(3),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const storagedSearch = await Storage.get(localStoragePrefix+'user');

        // Negative logic in this rare case is easier to understand
        if(!(storagedSearch && storagedSearch === data.search && profile)){
          const profiles: ProfileProps[] = await getProfiles(data.search)
          dispatch(actionRequestProfile(profiles));
        }

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
          setLoading(false);

          addToast({
            type: 'error',
            title: 'Invalid format!',
            description: 'The field must have at least 3 characters.',
          });

          return;
        }

        setLoading(false);

        addToast({
          type: 'error',
          title: 'Search unsuccessful!',
          description: err ? err.message : 'An error accours during the search process. Try again later!',
        });

      } finally {
        setLoading(false);
      }
    },
    [addToast, profile, dispatch, history],
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
