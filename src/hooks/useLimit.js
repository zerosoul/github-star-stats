import { useQuery, gql } from '@apollo/client';

export default function useLimit() {
  const { loading, error, data } = useQuery(gql`
    query getLimit {
      rateLimit {
        cost
        limit
        remaining
        resetAt
      }
    }
  `);
  // 在此处 gameover undefined 很有必要，用来指示请求还没回来
  return {
    loading,
    error,
    remaining: data ? data.rateLimit.remaining : 0,
    gameover: data ? data.rateLimit.remaining === 0 : undefined,
    resetDate:
      data &&
      `${new Date(data.rateLimit.resetAt).toLocaleDateString()} ${new Date(
        data.rateLimit.resetAt
      ).toLocaleTimeString()}`
  };
}
