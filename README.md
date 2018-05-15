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

## Chatwork API

TODO

### Environments

```
$ aws --profile serverless ssm put-parameter --name CHATWORK_API_TOKEN --type String --value xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
$ aws --profile serverless ssm put-parameter --name CHATWORK_ROOM_ID --type String --value xxxxxxxx
```

see: [Handling Secrets for Small Teams & Projects](https://serverless.com/blog/serverless-secrets-api-keys/)
