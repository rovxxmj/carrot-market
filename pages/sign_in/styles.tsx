import styled from '@emotion/styled';

export const Base = styled.div``;
export const Container = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: 400px;
  min-height: 600px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;

  & h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const Error = styled.p`
  font-size: 14px;
  color: red;
  text-align: center;
`;

export const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? 'lightgray' : 'gray')};
  color: ${({ disabled }) => (disabled ? 'gray' : 'black')};
  margin-top: 20px;
`;
