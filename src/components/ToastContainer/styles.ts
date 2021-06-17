import styled, { css } from "styled-components";

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #E6FFFA;
    color: #2E656A;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `
}

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: boolean;
}

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 2rem;
  overflow: hidden;
`;

export const Toast = styled.div<ToastProps>`
  width: 22.5rem;

  position: relative;

  padding: 1rem 2rem 1rem 1rem;

  border-radius: 0.25rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 0.5rem;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div { 
    flex: 1;
  }

  p {
    margin-top: 4px;
    font-size: 0.857rem;
    opacity: 0.8;
    line-height: 1.5rem;
  }

  button {
    position: absolute;
    right: 16px;
    top: 18px;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props => !props.hasDescription && css`
    align-items: center;

    svg {
      margin-top: 0;
    }
  `}
`;