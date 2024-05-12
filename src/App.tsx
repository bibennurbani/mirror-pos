import React from 'react';
import { observer } from 'mobx-react-lite';
import CGThemeProvider from './themes';
import { RouteProvider } from './contexts/RouteProvider';

const App: React.FC = observer(() => {
  return (
    <CGThemeProvider>
      <RouteProvider />
    </CGThemeProvider>
  );
});

export default App;
