import { useTransactions } from "../../hooks/transactions";

import trashImage from '../../assets/trash.svg';

import { Container } from "./styles";
import { useCallback } from "react";
import { useToast } from "../../hooks/toast";



export function TransactionsTable() {
  const { transactions, deleteTransaction } = useTransactions();
  const { addToast } = useToast();


  const handleDeleteTransaction = useCallback(async (id: string) => {
    await deleteTransaction(id)
    addToast({
      type: 'success',
      title: 'Sucesso',
      description: 'Transação excluída com sucesso!'
    });
  }, [addToast, deleteTransaction]);

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
                  onClick={() => handleDeleteTransaction(transaction.id)}
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