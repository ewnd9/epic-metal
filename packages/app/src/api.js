'use strict';

const axios = require('axios');
const config = require('../../../config.json');
const client = axios.create({
  auth: {
    username: process.env.APP_USERNAME,
    password: process.env.APP_PASSWORD,
  }
});

module.exports = {
  getJira,
};

if (!module.parent) {
  main()
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

async function main() {
  const data = await getJira();
  console.log(data);
}

async function getJira() {
  const result = [];

  for (const epic of config.epics) {
    const {data: data0} = await client({
      url: `${config.hostname}/rest/api/latest/issue/${epic.id}`,
    });

    const {data: data1} = await client({
      url: `${config.hostname}/rest/agile/1.0/epic/${epic.id}/issue`,
    });

    result.push({
      ...transformIssue(data0),
      children: data1.issues.map(issue => transformIssue(issue)),
    });
  }

  return {
    result,
  };
}

function transformIssue(issue) {
  return {
    id: issue.id,
    key: issue.key,
    created: issue.fields.created,
    updated: issue.fields.updated,
    summary: issue.fields.summary,
  };
}
