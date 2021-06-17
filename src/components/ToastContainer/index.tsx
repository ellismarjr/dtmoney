import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../hooks/toast';

import { Container, Toast } from "./styles";

interface ToastContainerProps {
  messages: ToastMessage[]
}

export function ToastContainer({ messages }: ToastContainerProps) {
  const { removeToast } = useToast();

  return (
    <Container>
      {messages.map(message => (
        <Toast
          key={message.id}
          type={message.type}
          hasDescription={!!message.description}
        >
          <FiAlertCircle size={20} />

          <div>
            <strong>{message.title}</strong>
            {message.description && <p>{message.description}</p>}
          </div>

          <button 
            type="button"
            onClick={() => removeToast(message.id)}
          >
            <FiXCircle size={18} />
          </button>
        </Toast>

      ))}
    </Container>
  );
}