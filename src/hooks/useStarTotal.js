import { useLazyQuery } from '@apollo/react-hooks';
import { GetStarTotal } from './query.graphql';

export default function useStarTotal() {
  const [getTotal, { data, loading, error }] = useLazyQuery(GetStarTotal);

  const getTotalCount = ({ owner, name }) => {
    getTotal({
      variables: {
        owner,
        name
      }
    });
  };
  return {
    getTotalCount,
    total: (data && data.repository.stargazers.totalCount) || null,
    loading,
    error
  };
}
