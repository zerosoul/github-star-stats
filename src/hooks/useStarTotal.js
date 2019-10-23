import { useCallback, useEffect } from 'react';
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
  // 有变化，就存localStorage
  useEffect(() => {
    if (data) {
      const { url } = data.repository;
      localStorage.setItem('LOCAL_REPO_URL', url);
    }
  }, [data]);
  return {
    getTotalCount,
    total: (data && data.repository.stargazers.totalCount) || null,
    loading,
    error
  };
}
