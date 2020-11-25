import React, { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';

import { getCache, openInExternalBrowser } from './electron';
import { Issue } from '../shared/types';

export const App: React.FC = () => {
  const [data, setData] = useState({ result: null, config: null });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const { config, result } = await getCache();
      setData({ config, result });
    })();
  }, []);

  if (!data.result) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex h-full">
      <div className="p-3 bg-gray-200 flex flex-col overflow-auto space-y-4">
        {data.result.map((issue: Issue, index) => (
          <div key={issue.key}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setIndex(index);
              }}
            >
              <div>
                {issue.key} <span className="text-xs">{issue.status.name}, {issue.children.length} issue(s)</span>
              </div>
              <div className="text-sm">{issue.summary}</div>
            </a>
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 flex flex-col overflow-auto space-y-4">
        {orderBy(data.result[index].children, 'status.name', 'desc').map((issue: Issue) => (
          <div key={issue.key}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                openInExternalBrowser(
                  `${data.config.hostname}/browse/${issue.key}`
                );
              }}
            >
              <div>
                {issue.key} <span className="text-xs">{issue.status.name}</span>
              </div>
              <div className="text-sm">{issue.summary}</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
