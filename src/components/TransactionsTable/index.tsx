import { useTransactions } from "../../hooks/useTransactions";

import trashImage from '../../assets/trash.svg';

import { Container } from "./styles";



export function TransactionsTable() {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(transaction.amount)}</td>
              <td>{transaction.category}</td>
              <td>{new Intl.DateTimeFormat('pt-BR')
                .format(new Date(transaction.createdAt))}
              </td>
              <td>
                <button 
                  type="button"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <img src={trashImage} alt="Remover" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}