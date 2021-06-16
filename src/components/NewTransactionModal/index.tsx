import { useState } from 'react';
import Modal from 'react-modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg'


import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { Input } from '../Form/InputForm';
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface CreateTransactionFormData {
  title: string;
  amount: number;
  category: string;
}

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Valor é obrigatório'),
  category: Yup.string().required('Categoria é obrigatório'),
});

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');

  const { register, handleSubmit, formState, reset } =
    useForm<CreateTransactionFormData>({
      resolver: yupResolver(schema)
    });

  const handleCreateNewTransaction: SubmitHandler<CreateTransactionFormData> = async (
    data) => {

    await createTransaction({
      title: data.title,
      amount: data.amount,
      category: data.category,
      type
    });

    reset();
    setType('deposit');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >

      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <h2>Cadastrar transação</h2>

        <Input
          placeholder="Título"
          error={formState.errors.title}
          {...register('title')}
        />

        <Input
          type="number"
          placeholder="Valor"
          error={formState.errors.amount}
          {...register('amount')}
        />

        <TransactionTypeContainer>
          <RadioBox
            type='button'
            isActive={type === 'deposit'}
            activeColor='green'
            onClick={() => setType('deposit')}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type='button'
            isActive={type === 'withdraw'}
            activeColor='red'
            onClick={() => setType('withdraw')}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <Input
          placeholder="Categoria"
          error={formState.errors.category}
          {...register('category')}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}