import { Base, Button, Container, Error } from '@pages/sign_in/styles';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import axios from 'axios';
import useMutation from '@libs/client/useMutation';

interface IForm {
  auth: string;
  password: string;
}

const SignIn = () => {
  const [login, { data, loading, error }] = useMutation('/api/users/login');
  const {
    register,
    handleSubmit,
    watch,
    setError,
    resetField,
    reset,
    formState: { errors },
  } = useForm<IForm>({ defaultValues: { auth: '', password: '' }, mode: 'onChange' });
  const { auth, password } = watch();
  const REG_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const REG_PHONE = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/i;

  // validation check & submit
  const onSubmit = useCallback((data: IForm) => {
    const formData = {
      email: REG_EMAIL.test(data.auth) ? data.auth : null,
      phone: REG_PHONE.test(data.auth) ? data.auth.replaceAll('-', '') : null,
      password: data.password,
    };

    if (error) {
      setError('auth', { message: '이메일/전화번호 혹은 비밀번호를 다시 확인해주세요' });
      setError('password', { message: '이메일/전화번호 혹은 비밀번호를 다시 확인해주세요' });
      return false;
    }

    login(formData);
    reset();
  }, []);

  return (
    <Base>
      <Container>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={'이메일 또는 전화번호'}
            type={'text'}
            isValue={Boolean(auth)}
            isInvalid={Boolean(errors.auth) || Boolean(errors.auth?.message)}
            register={register('auth', {
              required: true,
              validate: {
                emailPhoneForm: (value) => REG_EMAIL.test(value) || REG_PHONE.test(value),
              },
            })}
          />

          <Input
            label={'비밀번호'}
            type={'password'}
            isValue={Boolean(password)}
            isInvalid={Boolean(errors.password) || Boolean(errors.password?.message)}
            register={register('password')}
          />
          <Error>{errors.auth?.message}</Error>
          <Button type="submit" disabled={!auth || !password || Boolean(errors.auth) || Boolean(errors.password)}>
            로그인
          </Button>
        </form>
      </Container>
    </Base>
  );
};

export default SignIn;
