import { Base, Button, Container } from '@pages/sign_in/styles';
import AutoLabel from '@components/AutoLabel';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import axios from 'axios';

interface IForm {
  auth: string; // email or phone
  name: string;
  nickname: string;
  birth: string;
  password: string;
}

const SignUp = () => {
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
    const refinedData = {
      email: REG_EMAIL.test(data.auth) ? data.auth : null,
      phone: REG_PHONE.test(data.auth) ? data.auth : null,
      name: data.name,
      nickname: data.nickname,
      password: data.password,
      birth: data.birth,
    };
    setError('nickname', { message: '이미 사용중인 사용자 이름입니다.' });

    // axios
    //   .post('/api/users', refinedData)
    //   .then((res) => {
    //     console.log(res.data);
    //
    //     reset();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setError('nickname', { message: '이미 사용중인 사용자 이름입니다.' });
    //   });
  }, []);
  return (
    <Base>
      <Container>
        <h1>가입하기</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AutoLabel
            label={'이메일 또는 전화번호'}
            isValue={Boolean(auth)}
            isInvalid={Boolean(errors.auth) || Boolean(errors.auth?.message)}
          >
            <input
              type={'text'}
              {...register('auth', {
                required: true,
                validate: {
                  // emailPhoneForm: (value) => Boolean(value.match(REG_EMAIL)) || Boolean(value.match(REG_PHONE)),
                  emailPhoneForm: (value) => REG_EMAIL.test(value) || REG_PHONE.test(value),
                },
              })}
            />
          </AutoLabel>
          <AutoLabel
            label={'이름'}
            isValue={Boolean(name)}
            isInvalid={Boolean(errors.name) || Boolean(errors.name?.message)}
          >
            <input type={'text'} {...register('name', { required: true })} />
          </AutoLabel>{' '}
          <AutoLabel
            label={'사용자 이름'}
            isValue={Boolean(nickname)}
            isInvalid={Boolean(errors.nickname) || Boolean(errors.nickname?.message)}
          >
            <input type={'text'} {...register('nickname', { required: true })} />
          </AutoLabel>
          <AutoLabel
            label={'비밀번호'}
            isValue={Boolean(password)}
            isInvalid={Boolean(errors.password) || Boolean(errors.password?.message)}
          >
            <input type={'password'} {...register('password', { required: true })} />
          </AutoLabel>
          <AutoLabel isValue={false} isInvalid={Boolean(errors.birth) || Boolean(errors.birth?.message)}>
            <input type={'date'} {...register('birth', { required: true })} />
          </AutoLabel>
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
