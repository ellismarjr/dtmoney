import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import {v4 as uuidv4} from 'uuid';
import { api } from '../services/api';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      id: uuidv4(),
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction]);
  }

  const deleteTransaction = useCallback(async (id: string) => {
    await api.delete(`/transactions/${id}`);
    const transactionsFiltered = transactions.filter(transaction => transaction.id !== id);

    setTransactions(transactionsFiltered);
  }, [transactions]);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction,
      deleteTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
