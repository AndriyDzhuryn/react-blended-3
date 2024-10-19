import {
  Container,
  Heading,
  Section,
  SearchForm,
  Loader,
  CountryList,
} from 'components';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchByRegion } from 'service/countryApi';

export const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const region = searchParams.get('region');
    if (!region) {
      return;
    }
    const fetchCountries = async () => {
      try {
        setError('');
        setLoader(true);
        const result = await fetchByRegion(region);
        setCountries(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    0;
    fetchCountries();
  }, [searchParams]);
  const onSubmit = region => {
    setSearchParams({ region });
  };
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onSubmit} />
        {error && <Heading title={error} bottom />}
        {loader && <Loader />}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
