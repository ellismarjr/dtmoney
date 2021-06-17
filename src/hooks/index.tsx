import { ReactNode } from 'react';
import { ToastProvider } from './toast';
import { TransactionsProvider } from './transactions';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <TransactionsProvider>
      <ToastProvider>{children}</ToastProvider>
    </TransactionsProvider>
  );
}

export default AppProvider;