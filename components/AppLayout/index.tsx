import React, { FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@themes/themes';

interface IProps {
  children: React.ReactNode;
}

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <div>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
};

export default AppLayout;
