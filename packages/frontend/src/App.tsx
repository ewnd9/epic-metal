import React, { useState, useEffect } from 'react';

export const App: React.FC = () => {
  const [data, setData] = useState({ result: [] });
  useEffect(() => {
    (async () => {
      const {result} = await window.env();
      setData({result});
    })();
  }, []);

  return (
    <div className="App">
      <ul>
        {data.result.map((item: any) => (
          <>
            <li key={item.key}>{item.key} {item.summary}</li>
            {
              item.children.length > 0 ? (
                <li>
                  <ul>
                    {
                      item.children.map((item: any) => (
                        <li key={item.key}>{item.key} {item.summary}</li>
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
