import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function triggerDownload(imgURI, imgName = 'awesome', cb) {
  var evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  });

  var a = document.createElement('a');
  a.setAttribute('download', `${imgName}.star.chart.png`);
  a.setAttribute('href', imgURI);
  a.setAttribute('target', '_blank');

  a.dispatchEvent(evt);

  cb && cb();
}
function saveSource(data, filename) {
  if (!data) {
    return;
  }
  if (!filename) filename = 'awesome.json';
  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4);
  }
  var blob = new Blob([data], { type: 'text/json' });
  var e = document.createEvent('MouseEvents');
  var a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}
export default function DownloadSVG({ title = 'wtf title', svg = null, sourceData = [] }) {
  const handleClick = () => {
    const scaleRatio = 1;
    console.log({ svg });
    // 传入的是查询字符串
    if (typeof svg === 'string') {
      svg = document.querySelector(svg);
    }
    if (svg) {
      const titleSize = window.innerWidth > 800 ? 34 : 20;
      const fromSize = window.innerWidth > 800 ? 20 : 12;
      let canvas = document.createElement('canvas');
      console.log({ svg });
      svg.currentScale = scaleRatio;
      canvas.width = svg.scrollWidth * scaleRatio + 80;
      canvas.height = svg.scrollHeight * scaleRatio + 160;
      canvas.style.background = 'white';

      let ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      ctx.font = `${titleSize}px verdana`;
      const x = canvas.width / 2;
      ctx.textAlign = 'center';
      ctx.fillText(title, x, 40);

      ctx.textAlign = 'left';

      ctx.font = `${fromSize}px verdana`;
      ctx.fillStyle = '#ccc';
      ctx.fillText(`Generated by:https://stars.yangerxiao.com`, 40, canvas.height - 50);
      ctx.fillStyle = '#1890ff';
      ctx.fillText(`Twitter: @wsygc`, 40, canvas.height - 20, canvas.width - 40);
      let data = new XMLSerializer().serializeToString(svg);
      let DOMURL = window.URL || window.webkitURL || window;

      let img = new Image();
      let svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      let url = DOMURL.createObjectURL(svgBlob);

      img.onload = function () {
        ctx.drawImage(img, 20, 80);
        DOMURL.revokeObjectURL(url);

        let imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

        triggerDownload(imgURI, title.split('/').join('.'), () => {
          saveSource(sourceData);
        });
        // svg.currentScale = 1;
      };

      img.src = url;
    }
  };
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<DownloadOutlined />}
      size={'large'}
      onClick={handleClick}
    ></Button>
  );
}
