'use strict';

var querystring = require('querystring');
var https = require('https');

class Trello {
  constructor(event) {
    this.json = JSON.parse(event.body);
    this.actionType = this.json.action.type;
  }

  isTarget() { return ('commentCard' === this.actionType); }
};

class Chatwork {
  constructor(context, trello) {
    this.context = context;
    this.trello = trello;
  }

  notify() {
    const t = this.trello;

    if (!t.isTarget()) {
      console.log('is not target');
      return ;
    }

    console.log('is target');
    console.log(t.json.action.data.text);

    post();

    return response();
  }

  post() {
    var req = https.request(postOptions(), function(res) {
      res.setEncoding('utf8');
      res.on('data', function (body) {
        console.log(body);
        succeed();
      });
    }).on('error', function(e) {
      error();
    });

    req.write(data);
    req.end();
  }

  data() {
    // TODO
    // trello json to chatwork
    // XXX が YYY にコメントしました
    // xxxxxxxxxx
    // xxxxxxxxxx
//    var data = querystring.stringify({
//        body: 'hoge121@example.com'
//    });
  }

  postOptions() {
    hostname: '${host}',
    port: ${port},
    path: '${path}',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data()),
      'X-ChatWorkToken': '${chatwork_token}'
    }
  }

  succeed() {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'OK',
        input: event,
      }),
    };
  }

  error() {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'NG',
        input: event,
      }),
    };
  }
};

module.exports.hello = (event, context, callback) => {
  const t = new Trello(event);
  const c = new Chatwork(context, t);
  callback(null, c.notify());
};
