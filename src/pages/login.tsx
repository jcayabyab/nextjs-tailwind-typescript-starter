import { FormEvent, useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TypeAnimation from 'react-type-animation';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { Meta } from '@/layout/Meta';

const animationSequence = [
  'willsmith',
  4000,
  'chrisrock',
  4000,
  'popsmoke',
  4000,
  'poohshiesty',
  4000,
];

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, setUser } = useGlobalContext();

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const res = await axios.post('/api/login', {
        username: usernameInput,
        password: passwordInput,
      });
      const userFromBackend = await res.data;
      if (userFromBackend) {
        setUser({ ...userFromBackend, oneLink: userFromBackend.oneLink });
      } else {
        throw new Error('Login failed: Returned user was invalid');
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        setError(axiosError.response.data);
      } else {
        setError(axiosError.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="container mx-auto my-20 flex flex-col items-center rounded-xl text-white">
      <Meta title="Login" description="Log in to your OneLink account." />
      <h1 className="font-sans text-6xl font-bold">OneLink</h1>
      <h2 className="mb-4 pl-[50px] font-sans text-2xl font-bold ">
        onelink.cf/l/
        <div className="inline-block w-40">
          <TypeAnimation
            cursor
            sequence={animationSequence}
            repeat={Infinity}
            className="inline"
          />
        </div>
      </h2>
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <div>
          <input
            type="text"
            value={usernameInput}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setUsernameInput(event.currentTarget.value)
            }
            placeholder="Username"
            className="my-2 rounded-sm text-black"
          ></input>
        </div>
        <div>
          <input
            type="password"
            value={passwordInput}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setPasswordInput(event.currentTarget.value)
            }
            placeholder="Password"
            className="my-2 rounded-sm text-black"
          ></input>
        </div>
        <button
          type="submit"
          className="mt-2 rounded-full bg-white px-5 py-2 text-lg font-bold text-black"
        >
          Login
        </button>
      </form>
      <div className="my-2 text-red-300">{error || ''}</div>
      <div>
        <Link href="/register">
          <a className="font-semibold text-white hover:underline hover:decoration-white">
            Or click here to register
          </a>
        </Link>
      </div>
    </div>
  );
};
export default Login;
