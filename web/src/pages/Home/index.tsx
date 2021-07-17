import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  FiSearch,
  FiChevronRight,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
import * as Yup from 'yup';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns';
import { FormHandles } from '@unform/core';
import 'react-day-picker/lib/style.css';
import { Form } from '@unform/web';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Search,
  Content,
  Section,
  PropertiesContent,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useSelector } from 'react-redux';
import { selectProperty } from '../../store';
import { PropertyProps, WidgetsProps } from '../../types';
import { numberFormat, priceFormatter } from '../../utils/format';
import { MainHeader, Spinner, SpinnerWrapper, Widget } from '../../components';

interface SearchFormData {
  search: string;
}

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const { loading: loadingState, property, error } = useSelector(selectProperty);
  const [filteredProperties, setFilteredProperties] = useState<PropertyProps[] | undefined>([]);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  useEffect(() => {
    if(error) {
      addToast({
        type: 'error',
        title: 'Failed!',
        description:
          'There was an unknown error while searching for properties. Try again!',
      });
    } else {
      if (property) {
        setFilteredProperties([...property])
      }
    }
  }, [loadingState, property]);

  const handlePropertySearch = useCallback(
    async (data: SearchFormData) => {
      try {
        setLoading(true);

        if(!property) {
          addToast({
            type: 'error',
            title: 'Search failed!',
            description:
              'There was an unknown error while searching for movies. Try again!',
          });
          return;
        }

        const filterWord = String(data.search).toLocaleLowerCase().trim();
        const newfilteredProperties = [...property].filter(props =>
          String(props.overview?.neighborhood).toLocaleLowerCase().trim().includes(filterWord) ||
          String(props.overview?.city).toLocaleLowerCase().trim().includes(filterWord) ||
          String(props.overview?.zipcode).toLocaleLowerCase().trim().includes(filterWord)
        )

        if(newfilteredProperties) {
          setFilteredProperties([...newfilteredProperties]);
          addToast({
            type: 'success',
            title: 'Search successful!',
            description: 'Enjoy your future home!',
          });
        }
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
    [addToast, property],
  );

  const handleOrder = useCallback(async () => {
    if (loading) {
      return;
    }
    /** @todo */
  }, []);

  const lastVisited = useMemo(() => {
    if(filteredProperties){
      return [...filteredProperties].sort(
        (a, b) => {
          const atrB = b.visits?.lastVisited ? new Date(b.visits.lastVisited) : new Date();
          const atrA = a.visits?.lastVisited ? new Date(a.visits.lastVisited) : new Date();
          return Math.abs(atrB.getTime() - atrA.getTime());
        }
      ).slice(0, 4).map(prop => {
        return {
          propId: prop.id,
          imageStr: prop.homeImage,
          price: priceFormatter.format(Number(prop.overview?.price)),
          views: numberFormat.format(Number(prop.visits?.total))
        }
      })
    }
  }, [filteredProperties]) as WidgetsProps[] | undefined;

  const mostVisited = useMemo(() => {
    if(filteredProperties){
      return [...filteredProperties].sort((a, b) => (
        (a.visits?.total ? a.visits?.total : 0) <
        (b.visits?.total ? b.visits?.total : 0)  ? 1 : -1)
        ).slice(0, 4).map(prop => {
        return {
          propId: prop.id,
          imageStr: prop.homeImage,
          price: priceFormatter.format(Number(prop.overview?.price)),
          views: numberFormat.format(Number(prop.visits?.total))
        }
      })
    }
  }, [filteredProperties]) as WidgetsProps[] | undefined;

  const selectedDateAsText = useMemo(() => {
    return format(new Date(), "MMMM dd'th'", {
      locale: enUS,
    });
  }, []);

  const selectedWeekDay = useMemo(() => {
    return format(new Date(), 'cccc', {
      locale: enUS,
    });
  }, []);

  return (
    <Container data-testid="home_page">
      <MainHeader />

      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Content>
          <Search>
            <h1>Find Your New Home</h1>
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
                placeholder="Find your home by neighborhood, city, or a ZIP code"
              />
              <Button loading={loading} type="submit">
                Search
              </Button>
            </Form>

            <button type="button" onClick={handleOrder}>
              {true ? <FiArrowDown /> : <FiArrowUp />}
            </button>

            <Section>
              <strong>Most Visited</strong>
              {mostVisited?.length === 0 && <p>No properties found.</p>}

              {mostVisited && mostVisited.length !== 0 && (
                <PropertiesContent>
                  {mostVisited.map((prop, index) => (
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

            <Section>
              <strong>Last Visited</strong>
              {lastVisited?.length === 0 && <p>No properties found.</p>}

              {lastVisited && lastVisited.length !== 0 && (
                <PropertiesContent>
                  {lastVisited.map((prop, index) => (
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
          </Search>
        </Content>
      )}
    </Container>
  );
};
