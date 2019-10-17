import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { GetStarTotal } from './query.graphql';

export default function useStarTotal() {
  const [getTotal, { data, loading, error }] = useLazyQuery(GetStarTotal);

  const getTotalCount = useCallback(
    ({ owner, name }) => {
      getTotal({
        variables: {
          owner,
          name
        }
      });
    },
    [getTotal]
  );

  return {
    getTotalCount,
    total: (data && data.repository.stargazers.totalCount) || null,
    loading,
    error
  };
}
