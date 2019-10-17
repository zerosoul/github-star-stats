import { useQuery } from '@apollo/react-hooks';
import { getLimit } from './query.graphql';

export default function useLimit() {
  const { loading, error, data } = useQuery(getLimit);
  return {
    loading,
    error,
    data,
    gameover: data && data.rateLimit.remaining === 0,
    resetDate:
      data &&
      `${new Date(data.rateLimit.resetAt).toLocaleDateString()} ${new Date(
        data.rateLimit.resetAt
      ).toLocaleTimeString()}`
  };
}
