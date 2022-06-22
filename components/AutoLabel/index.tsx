import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';
interface IProps {
  children: React.ReactNode;
  label?: string;
  isValue: boolean;
  isInvalid: boolean;
}

const Base = styled.div<{ isValue: boolean }>`
  margin-bottom: 10px;
  position: relative;

  & input {
    //padding: 10px 12px;
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
      color: blue;
    }

    & .fail {
      color: red;
    }
  }
`;

const AutoLabel: FC<IProps> = ({ label, children, isValue, isInvalid }) => {
  return (
    <Base isValue={isValue}>
      <label>
        <span className={'label'}>{label}</span>
        {children}
        <div className={'validation'}>
          {isValue && !isInvalid && (
            <span className={'success'}>
              <IoIosCheckmarkCircle />
            </span>
          )}
          {isValue && isInvalid && (
            <span className={'fail'}>
              <IoIosCloseCircle />
            </span>
          )}
        </div>
      </label>
    </Base>
  );
};

export default AutoLabel;
