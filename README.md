# datadog-log-downloader

A Node.js utility for retrieving Datadog logs. In a sense, a small implementation of [Collect multiple logs with Pagination](https://docs.datadoghq.com/logs/guide/collect-multiple-logs-with-pagination/#overview).

## Pre-requisites

- Install [Node.js](https://nodejs.org/en/).
- Set the environment variables `DD_API_KEY`, `DD_APP_KEY` and `DD_SITE_URL` according to your account details.

## Getting started

- Install dependencies `npm install`.

## Usage

```bash
cd datadog-log-downloader
query="*" from="now - 15m" to="now" npm start
```

or, if you want to place them in a file, you can:

```bash
query="*" from="now - 15m" to="now" npm start > log_dump.log
```

## Notes

- This script interacts with Datadog's ["Get a list all of logs"](https://docs.datadoghq.com/api/?lang=python#get-a-list-of-logs) endpoint.
- The parameters above (`query`, `from` and `to`) accept the same kind of arguments as in Datadog's documentation. This gives you some _flexibility in terms of how you'd like to express your timestamps_.
