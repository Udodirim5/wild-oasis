import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  font-size: 16px;
  box-shadow: var(--shadow-sm);

  /* Focus State */
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  /* Placeholder Styling */
  &::placeholder {
    color: #999;
    font-style: italic;
  }

  /* Disabled State */
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  /* Hover Effect */
  &:hover {
    border-color: #888;
  }
`;

export default Input;