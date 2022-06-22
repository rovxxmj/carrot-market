import React, { FC } from 'react';
import styled from '@emotion/styled';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';
import { useTheme } from '@emotion/react';
import { Base } from '@components/Input/styles';
interface IProps {
  label?: string;
  type: 'text' | 'password' | 'date';
  isValue: boolean;
  isInvalid: boolean;
  [key: string]: any;
}

const AutoLabel: FC<IProps> = ({ label, isValue, isInvalid, type = 'text', register, ...rest }) => {
  const theme = useTheme();
  return (
    <Base isValue={isValue} theme={theme}>
      <label>
        <span className={'label'}>{label}</span>
        <input type={type} {...register} {...rest} />
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
