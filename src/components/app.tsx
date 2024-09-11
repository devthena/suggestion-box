import React, { useEffect } from 'react';

import { useDataState } from '../hooks';
import { Suggestion } from '../lib/types';

export const App: React.FC = () => {
  const { suggestions, generateMockData } = useDataState();

  useEffect(() => {
    if (suggestions.size > 0) return;
    generateMockData();
  }, [suggestions.size, generateMockData]);

  if (!suggestions.size) return <main>Loading...</main>;

  return (
    <main>
      <h1>Suggestion Box</h1>
      <div>
        {[...suggestions.values()].map((suggestion: Suggestion) => (
          <div key={suggestion.id}>
            <h2>{suggestion.title}</h2>
            <p>Author: {suggestion.author.name}</p>
            <p>{suggestion.description}</p>
            <p>Comment Count: {suggestion.comments.length}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
