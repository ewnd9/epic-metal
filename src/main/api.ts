'use strict';

import axios from 'axios';

import fs from 'fs';

import { Issue } from '../shared/types';

export const config = JSON.parse(
  fs.readFileSync(`${__dirname}/../../../config.json`, 'utf-8')
);

const client = axios.create({
  auth: {
    username: process.env.APP_USERNAME,
    password: process.env.APP_PASSWORD,
  },
});

export async function getJira(): Promise<{ result: Issue[] }> {
  const result = [];

  for (const epic of config.epics) {
    const { data: data0 } = await client({
      url: `${config.hostname}/rest/api/latest/issue/${epic.id}`,
    });

    const { data: data1 } = await client({
      url: `${config.hostname}/rest/agile/1.0/epic/${epic.id}/issue`,
    });

    result.push({
      ...transformIssue(data0),
      children: data1.issues.map((issue) => transformIssue(issue)),
    });
  }

  return {
    result,
  };
}

function transformIssue(issue): Issue {
  return {
    id: issue.id,
    key: issue.key,
    assignee: issue.fields.assignee && {
      displayName: issue.fields.assignee.displayName,
    },
    reporter: issue.fields.reporter && {
      displayName: issue.fields.reporter.displayName,
    },
    status: {
      id: issue.fields.status.id,
      name: issue.fields.status.name,
    },
    created: issue.fields.created,
    updated: issue.fields.updated,
    summary: issue.fields.summary,
    description: issue.description,
    children: [],
  };
}
