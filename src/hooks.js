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
const DefaultVars = {
  name: 'chinese-colors',
  owner: 'zerosoul'
};
export function useStars() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loadStars, { called, data: pageData }] = useLazyQuery(STARS, {
    variables: {
      ...DefaultVars
    }
  });

  useEffect(() => {
    if (pageData) {
      setLoading(true);
      const { stargazers } = pageData.repository;
      const { edges, totalCount } = stargazers;
      const { hasNextPage, endCursor } = stargazers.pageInfo;
      setData(oldData => {
        const tmpObj = {};
        edges.forEach(({ node, starredAt }) => {
          let dateObj = new Date(starredAt);
          let keyVal = `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
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
            ...DefaultVars,
            after: endCursor
          }
        });
      } else {
        setLoading(false);
      }
    } else if (called) {
      setLoading(true);
    }
  }, [pageData, loadStars, called]);
  return { loadStars, data, pageData, loading };
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
