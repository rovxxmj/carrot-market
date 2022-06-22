import styled from '@emotion/styled';

export const Base = styled.div<{ isValue: boolean; [key: string]: any }>`
  margin-bottom: 10px;
  position: relative;

  & input {
    width: 100%;
    height: 44px;
    border-radius: 2px;
    padding: ${({ isValue }) => (isValue ? '17px 12px 3px' : '10px 12px')};
    font-size: 15px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    &:focus {
      outline: none;
    }
  }

  & .label {
    position: absolute;
    font-size: ${({ isValue }) => (isValue ? '10px' : '13px')};
    left: 12px;
    transition: 0.2s ease;
    top: ${({ isValue }) => (isValue ? '6px' : '12px')};
  }

  & .validation {
    position: absolute;
    top: 10px;
    right: 12px;
    font-size: 24px;

    & .success {
      color: ${({ theme }) => theme.colors.blue[600]};
    }

    & .fail {
      color: ${({ theme }) => theme.colors.red[600]};
    }
  }
`;
