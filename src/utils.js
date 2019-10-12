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
