import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const STARS = gql`
  query GetStars($name: String!, $owner: String!, $after: String) {
    repository(name: $name, owner: $owner) {
      createdAt
      stargazers(first: 100, after: $after) {
        edges {
          node {
            id
            login
            name
            avatarUrl
          }
          starredAt
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
  }
`;

const STARS_TOTAL = gql`
  query GetStarTotalCount($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      stargazers {
        totalCount
      }
    }
  }
`;
export function useStars() {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [repo, setRepo] = useState(null);
  const [data, setData] = useState(undefined);
  const [loadStars, { called, data: pageData, variables, error }] = useLazyQuery(STARS);
  const [getTotal, { data: totalData }] = useLazyQuery(STARS_TOTAL);

  useEffect(() => {
    if (pageData) {
      setLoading(true);
      const { stargazers } = pageData.repository;
      const { edges, totalCount } = stargazers;
      const { hasNextPage, endCursor } = stargazers.pageInfo;
      setData((oldData = {}) => {
        const tmpObj = {};
        edges.forEach(({ node, starredAt }) => {
          let dateObj = new Date(starredAt);
          let keyVal = `${dateObj.toLocaleDateString(navigator.language, {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
          })}`;
          // 考虑老数据可能有相同key
          tmpObj[keyVal] = tmpObj[keyVal]
            ? tmpObj[keyVal]
            : oldData[keyVal]
            ? oldData[keyVal]
            : null;
          if (tmpObj[keyVal]) {
            tmpObj[keyVal].count = tmpObj[keyVal].count + 1;
            tmpObj[keyVal].users = [...tmpObj[keyVal].users, { ...node, starredAt }];
          } else {
            tmpObj[keyVal] = { count: 1, users: [{ ...node, starredAt }] };
          }
        });
        return { ...oldData, ...tmpObj, total: totalCount };
      });

      if (hasNextPage) {
        loadStars({
          variables: {
            ...variables,
            after: endCursor
          }
        });
      } else {
        setLoading(false);
        setFinished(true);
      }
    } else if (called) {
      setLoading(true);
      setFinished(false);
    }
  }, [pageData, loadStars, called, variables]);
  const startLoadStars = ({ owner, name }) => {
    setData(undefined);
    setFinished(false);
    setRepo({ owner, name });
    loadStars({
      variables: {
        owner,
        name
      }
    });
  };
  const getTotalCount = ({ owner, name }) => {
    setData(undefined);
    setFinished(false);
    getTotal({
      variables: {
        owner,
        name
      }
    });
  };
  return {
    getTotalCount,
    startLoadStars,
    repo,
    data,
    total: (totalData && totalData.repository.stargazers.totalCount) || null,
    loading: loading && !error,
    finished,
    error
  };
}

export function useLimit() {
  const LIMIT = gql`
    query {
      rateLimit {
        cost
        limit
        remaining
        resetAt
      }
    }
  `;
  const { loading, error, data } = useQuery(LIMIT);
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
