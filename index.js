const line = require('@line/bot-sdk');
const express = require('express');
const moment = require('moment');

const config = {
  channelAccessToken: 'TW2Hr46MLsq+Ue7P6PfJhPzVuOk4MZsrSh+KXLGCtgwyhzHth0BJh16thF1/+8VG4Z2FX4Sw1p3/nwko7UPNyBzxFD51NDihPRwA3GrIBOtlQWaPyNqchi1v0Kz5oRGAWujGuYttUWhBlagKhXEkbQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'c11a56c4bba627ba00da73f929a843e0',
};

const client = new line.Client(config);
const app = express();

// 處理接收的訊息
app.post('/webhook', line.middleware(config), (req, res) => {
  const events = req.body.events;
  Promise.all(events.map(handleEvent)).then((result) => res.json(result));
});

// 處理單一事件
async function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    const messageText = event.message.text;
    let replyText;

    if (messageText === '!週二開團') {
      replyText = getTuesdayEventMessage();
    } else if (messageText === '!週五開團') {
      replyText = getFridayEventMessage();
    } else {
      return;
    }

    // 回傳訊息
    return client.replyMessage(event.replyToken, { type: 'text', text: replyText });
  }
}

// 取得「週二開團」的回應訊息
function getTuesdayEventMessage() {
  // 計算下週二與本週日的日期
  const nextTuesday = moment().isoWeekday(9).format('MM/DD'); // 下週二
  const thisSunday = moment().isoWeekday(7).format('MM/DD'); // 本週日

  return `⚠️⚠️⚠️⚠️⚠️⚠️     
開團時間：${nextTuesday}（二）20:00～22:00
統計一下會出現的人數哦🤗     

地點：🔆大高雄羽球館大社館🔆高雄市大社區和平路一段85-1號

*統計人數於${thisSunday}（日）20:00截止，人數未達4人，則取消開團。
*請各位依照順序報下去，超過6人開第二個場（如果有空場）。

⚠️報名後，臨時才說不能來，球錢照收喔‼️

1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
11.
12.

回報請走格式📝     
謝謝配合唷👍`;
}

// 取得「週五開團」的回應訊息
function getFridayEventMessage() {
  // 計算本週五與本週三的日期
  const thisFriday = moment().isoWeekday(5).format('MM/DD'); // 本週五
  const thisWednesday = moment().isoWeekday(3).format('MM/DD'); // 本週三

  return `⚠️⚠️⚠️⚠️⚠️⚠️     
開團時間：${thisFriday}（五）20:00～22:00
統計一下會出現的人數哦🤗     

地點：🔆大高雄羽球館大社館🔆高雄市大社區和平路一段85-1號

*統計人數於${thisWednesday}（三）20:00截止，人數未達4人，則取消開團。
*請各位依照順序報下去，超過6人開第二個場（如果有空場）。

⚠️報名後，臨時才說不能來，球錢照收喔‼️

1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
11.
12.

回報請走格式📝     
謝謝配合唷👍`;
}

// 啟動應用
app.listen(3000, () => {
  console.log('App running on port 3000');
});
