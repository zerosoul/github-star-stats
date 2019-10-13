import URLSearchParams from '@ungap/url-search-params';

export function shuffle(array) {
  let counter = array.length;
  console.log('shuffle', array);

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

export function getTimeFormated(count, zh = false) {
  return zh
    ? `${String(Math.floor(count / 60))}分${String(count % 60)}秒`
    : `${String(Math.floor(count / 60)).padStart(2, '0')}:${String(count % 60).padStart(2, '0')}`;
}
export function getQueryValue(key = '') {
  const params = new URLSearchParams(location.search);
  const val = params.get(key) || '';
  return val;
}
export function getRepo(url = '') {
  if (!url) return null;
  try {
    let tmp = new URL(url);
    let isOrigin = tmp.host == 'github.com';
    let isHttp = tmp.protocol.indexOf('http') > -1;
    let isPath = tmp.pathname.split('/').length === 3;
    // eslint-disable-next-line no-unused-vars
    let [unused, owner = '', name = ''] = tmp.pathname.split('/');
    let isFull = owner && name;
    if (isOrigin && isHttp && isPath && isFull) {
      return { owner, name };
    }
  } catch (error) {
    return null;
  }

  return null;
}

export function getSparklinesData(data) {
  let tmpData = { ...data };
  delete tmpData.total;
  // eslint-disable-next-line no-unused-vars
  tmpData = Object.entries(tmpData).map(([keyVal, { count }]) => {
    return count;
  });
  console.log({ tmpData });

  return tmpData;
}
export function getAvators(data) {
  let starUsers = [];
  let tmpData = { ...data };
  delete tmpData.total;
  // login name avatarUrl
  // eslint-disable-next-line no-unused-vars
  tmpData = Object.entries(tmpData).forEach(([keyVal, { users }]) => {
    let tmpArr = users.map(({ login, name, avatarUrl }) => {
      return { login, name: name || login, url: avatarUrl };
    });
    starUsers = starUsers.concat(tmpArr);
  });
  console.log({ starUsers, data });

  return starUsers;
}

export function getChartData(data) {
  let chartData = { ...data };
  delete chartData.total;

  // [
  //   {
  //     date: '2019/1/12',
  //     count: 590,
  //   },
  // ];
  // eslint-disable-next-line no-unused-vars
  chartData = Object.entries(chartData).map(([keyVal, { count }]) => {
    return { date: keyVal, star: count };
  });
  console.log({ chartData, data });

  return chartData;
}

export function getPercent(data) {
  let chartData = { ...data };
  let tmpTotal = chartData.total || 0;
  delete chartData.total;

  // eslint-disable-next-line no-unused-vars
  chartData = Object.entries(chartData).map(([keyVal, { count }]) => {
    return count;
  });

  let currCount = chartData.reduce((prev, curr) => prev + curr, 0);
  currCount = Number.isNaN(currCount) ? 0 : currCount;
  console.log({ currCount, tmpTotal });
  return tmpTotal == 0 ? 0 : Math.floor((currCount / tmpTotal) * 100);
}
