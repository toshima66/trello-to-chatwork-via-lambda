# trello-to-chatwork-via-lambda

trello notifications to chatwork

# setup

## Create endpoint

`$ sls deploy`

```
endpoints:
  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/hello
```

## Trello webhook

see: https://developers.trello.com/page/webhooks

### Get Trello API Key

open: https://trello.com/app-key

### Create Webhook

```
curl -X POST -H "Content-Type: application/json" \
https://api.trello.com/1/tokens/{APIToken}/webhooks/ \
-d '{
  "key": "{APIKey}",
  "callbackURL": "https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/hello",
  "idModel": "{BoardId}",
  "description": "My first webhook"
}'
```
