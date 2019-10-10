import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const EXCHANGE_RATES = gql`
  query {
    repository(name: "chinese-colors", owner: "zerosoul") {
      createdAt
      stargazers(first: 100) {
        nodes {
          id
          login
          name
          websiteUrl
        }
        totalCount
      }
    }
  }
`;
const App = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
};
export default App;
