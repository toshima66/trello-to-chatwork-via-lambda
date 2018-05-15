'use strict';

var querystring = require('querystring');
var https = require('https');

const chatwork_api_token = process.env.CHATWORK_API_TOKEN;
const chatwork_room_id = process.env.CHATWORK_ROOM_ID;
const chatwork_host = 'api.chatwork.com';

class Trello {
  constructor(event) {
    this.json = JSON.parse(event.body);
    this.actionType = this.json.action.type;
  }

  isTarget() { return ('commentCard' === this.actionType); }
}

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

    this.post();
  }

  message() {
    const j = this.trello.json;
    var comment = j.action.data.text;
    var cardName = j.action.data.card.name;
    var userName = j.action.memberCreator.username;
    var shortLink = 'https://trello.com/c/' + j.action.data.card.shortLink;

    return `[info][title]${cardName} - ${shortLink}[/title]${comment}\n[hr]by ${userName}[/info]`;
  }

  post() {
    var c = this;
    var data = this.data();
    var req = https.request(this.postOptions(data), function(res) {
      res.setEncoding('utf8');
      res.on('data', function (body) {
        console.log(body);
        c.response();
      });
    }).on('error', function(e) {
      console.log(`error: ${e}`);
      c.response();
    });

    req.write(data);
    req.end();
  }

  response() {
    let response = {
      'statusCode': 200,
      'headers': { 'Content-Type': 'text/plain' },
      'body': 'finish'
    }
    this.context.succeed(response)
  }

  data() {
    return querystring.stringify({ body: this.message() });
  }

  postOptions(data) {
    return {
      hostname: chatwork_host,
      port: 443,
      path: this.path(),
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data),
        'X-ChatWorkToken': chatwork_api_token
      }
    };
  }

  path() {
    return `/v2/rooms/${chatwork_room_id}/messages`;
  }
}

module.exports.hello = (event, context) => {
  const t = new Trello(event);
  const c = new Chatwork(context, t);
  c.notify();
};
