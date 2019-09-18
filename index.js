const axios = require("axios").default;

const { DD_API_KEY, DD_APP_KEY, DD_SITE_URL } = process.env;

/**
 * Bulids the URL to query based on your credentinals.
 *
 * @param {String} apiKey - Datadog's API key.
 * @param {String} appKey - Datadog's APP key.
 * @param {String} siteURL - either https://api.datadoghq.com or https://api.datadoghq.eu.
 */
const buildURL = (apiKey, appKey, siteURL) =>
  `${siteURL}/api/v1/logs-queries/list?api_key=${apiKey}&application_key=${appKey}`;

/**
 * Builds the search query that will be run against your logs. You can refer to
 * https://docs.datadoghq.com/api/?lang=python#get-a-list-of-logs for more details.
 * It defaults to the last hour of logs.
 *
 * @param {String} query - the search query - following the Log search syntax.
 * @param {String} from - minimum timestamp for requested logs.
 * @param {String} to - maximum timestamp for requested logs.
 */
const buildQuery = (query = "*", from = "now - 1h", to = "now") => ({
  query: process.env.query || query,
  time: {
    from: process.env.from || from,
    to: process.env.to || to
  },
  sort: "desc",
  limit: "1000"
});

/**
 * Simply prints out the logs messages in order taking care of pagination.
 */
const printLogs = async () => {
  const url = buildURL(DD_API_KEY, DD_APP_KEY, DD_SITE_URL);
  const query = buildQuery(process.env.query, process.env.from, process.env.to);
  try {
    let logs = [];
    let paginated = true;
    let nextLogId = null;
    while (paginated) {
      if (nextLogId) {
        query.startAt = nextLogId;
      }
      const response = await axios.post(url, query);
      logs = logs.concat(response.data.logs);
      if (response.data.nextLogId) {
        nextLogId = response.data.nextLogId;
      } else {
        paginated = false;
      }
    }
    // Plenty of room for optimization though mainly interested in printing out
    // the logs for now.
    logs.forEach(log => console.log(log.content.message));
  } catch (error) {
    console.log(error);
  }
};

printLogs();
