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
export function useStars() {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [data, setData] = useState(undefined);
  const [loadStars, { called, data: pageData, variables, error }] = useLazyQuery(STARS);

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
          let keyVal = `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
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
    loadStars({
      variables: {
        owner,
        name
      }
    });
  };
  return { startLoadStars, data, loading, finished, error };
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
  return { loading, error, data };
}
