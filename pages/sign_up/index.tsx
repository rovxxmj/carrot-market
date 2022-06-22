import { Base, Button, Container, Error } from '@pages/sign_in/styles';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import useMutation from '@libs/client/useMutation';

interface IForm {
  auth: string; // email or phone
  name: string;
  nickname: string;
  birth: string;
  password: string;
}

const SignUp = () => {
  const [join, { data, loading, error }] = useMutation('/api/users');
  const {
    register,
    handleSubmit,
    watch,
    setError,
    resetField,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: { auth: '', name: '', nickname: '', password: '', birth: '' },
    mode: 'onChange',
  });
  const { auth, name, nickname, password, birth } = watch();
  const REG_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const REG_PHONE = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/i;

  const onSubmit = useCallback((data: IForm) => {
    const formData = {
      email: REG_EMAIL.test(data.auth) ? data.auth : null,
      phone: REG_PHONE.test(data.auth) ? data.auth.replaceAll('-', '') : null,
      name: data.name,
      nickname: data.nickname,
      password: data.password,
      birth: data.birth,
    };

    if (error) {
      setError('nickname', { message: '이미 사용중인 사용자 이름입니다.' });
      return false;
    }
    join(formData);
    reset();
  }, []);

  return (
    <Base>
      <Container>
        <h1>가입하기</h1>
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
            label={'이름'}
            type={'text'}
            isValue={Boolean(name)}
            isInvalid={Boolean(errors.name) || Boolean(errors.name?.message)}
            register={register('name', { required: true })}
          />
          <Input
            label={'사용자 이름'}
            type={'text'}
            isValue={Boolean(nickname)}
            isInvalid={Boolean(errors.nickname) || Boolean(errors.nickname?.message)}
            register={register('nickname', { required: true })}
          />
          <Input
            label={'비밀번호'}
            type={'password'}
            isValue={Boolean(password)}
            isInvalid={Boolean(errors.password) || Boolean(errors.password?.message)}
            register={register('password', { required: true })}
          />
          <Input
            type="date"
            isValue={false}
            isInvalid={Boolean(errors.birth) || Boolean(errors.birth?.message)}
            register={register('birth', { required: true })}
          />
          <Error>{errors.nickname?.message}</Error>
          <Button
            type={'submit'}
            disabled={
              !auth ||
              !name ||
              !nickname ||
              !password ||
              !birth ||
              Boolean(errors.auth) ||
              Boolean(errors.name) ||
              Boolean(errors.nickname) ||
              Boolean(errors.password) ||
              Boolean(errors.birth)
            }
          >
            가입하기
          </Button>
        </form>
      </Container>
    </Base>
  );
};

export default SignUp;
