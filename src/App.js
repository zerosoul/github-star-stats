import React from 'react';

import { useStars, useLimit } from './hooks';

const App = () => {
  const { loadStars, data, loading } = useStars();
  const { loading: lLoading, error: lError } = useLimit();
  if (lLoading) return <p>Loading...</p>;
  if (lError) return <p>Error :(</p>;
  console.log({ data });

  return (
    <>
      <button
        disabled={loading}
        onClick={() => {
          loadStars();
        }}
      >
        load stars
      </button>
      {!loading && <span>共{data.total}</span>}
      <table>
        <thead>
          <tr>
            <td>关注日期</td>
            <td>新增关注数</td>
            <td>用户</td>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            Object.entries(data).map(([date, { count, users }]) => {
              if (date !== 'total') {
                return (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{count}</td>
                    <td>
                      {users
                        .map(({ login }) => {
                          return login;
                        })
                        .join(',')}
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
    </>
  );
};
export default App;
