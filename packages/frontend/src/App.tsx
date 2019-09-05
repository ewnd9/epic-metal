import React, { useState, useEffect } from 'react';

export const App: React.FC = () => {
  const [data, setData] = useState({ result: [], config: null });
  useEffect(() => {
    (async () => {
      const {config, result} = await window.env();
      setData({config, result});
    })();
  }, []);

  return (
    <div className="App">
      <ul>
        {data.result.map((item: Issue) => (
          <>
            <Issue key={item.key} issue={item} config={data.config} />
            {
              item.children.length > 0 ? (
                <li>
                  <ul>
                    {
                      item.children.map((item: Issue) => (
                        <Issue key={item.key} issue={item} config={data.config} />
                      ))
                    }
                  </ul>
                </li>
              ) : null
            }
          </>
        ))}
      </ul>
    </div>
  );
}

interface Issue {
  key: string;
  summary: string;
  children: Array<Issue>;
}

interface IssueProps {
  issue: Issue;
  config: any;
}

const Issue: React.FC<IssueProps> = ({issue, config}: IssueProps) => {
  const url = `${config.hostname}/browse/${issue.key}`;

  return (
    <li>
      <a
        href="#"
        onClick={event => {
          event.preventDefault();
          window.openInSystemBrowser(url);
        }}
      >
        {issue.key}
      </a>
      {' '}
      {issue.summary}
    </li>
  );
}
