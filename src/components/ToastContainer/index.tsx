
import { ToastMessage } from '../../hooks/toast';

import { Toast } from './Toast';

import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastMessage[]
}

export function ToastContainer({ messages }: ToastContainerProps) {
  return (
    <Container>
      {messages.map(message => (
        <Toast
          key={message.id}
          message={message}
        />

      ))}
    </Container>
  );
}