import { FormEvent, useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { Meta } from '@/layout/Meta';

const Register = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [linkNameInput, setLinkNameInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, setUser } = useGlobalContext();

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // eslint-disable-next-line no-restricted-syntax
    for (const input of [
      usernameInput,
      passwordInput,
      firstNameInput,
      lastNameInput,
      linkNameInput,
    ]) {
      if (input.length === 0) {
        setError('Required fields cannot be blank');
        return;
      }
    }

    const body = {
      username: usernameInput,
      password: passwordInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      oneLink: linkNameInput,
    };

    try {
      const res = await axios.post('/api/register', body);
      const userFromBackend = res.data;
      if (userFromBackend) {
        setUser(userFromBackend);
      } else {
        throw new Error('The server had a problem registering the user.');
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
      <Meta
        title="Register"
        description="Register for a new OneLink account."
      />
      <h1 className="font-sans text-5xl font-bold md:text-6xl">OneLink</h1>
      <div className="mb-4 font-sans text-sm font-semibold">
        * Required field
      </div>
      <form
        onSubmit={handleRegister}
        className="flex w-full max-w-sm flex-col items-stretch px-2"
      >
        <div className="flex items-start">
          <input
            type="text"
            value={usernameInput}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setUsernameInput(event.currentTarget.value)
            }
            placeholder="Username"
            className="my-2 w-0 flex-1 rounded-sm text-black"
          ></input>
          <span className="pl-1">*</span>
        </div>
        <div className="flex items-start">
          <input
            type="password"
            value={passwordInput}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setPasswordInput(event.currentTarget.value)
            }
            placeholder="Password"
            className="my-2 w-0 flex-1 rounded-sm text-black"
          ></input>
          <span className="pl-1">*</span>
        </div>
        <div className="flex max-w-full flex-row flex-wrap">
          <input
            type="text"
            value={firstNameInput}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setFirstNameInput(event.currentTarget.value)
            }
            placeholder="First Name"
            className="my-2 mr-3 w-0 min-w-0 grow rounded-sm text-black"
          ></input>
          <input
            type="text"
            value={lastNameInput}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setLastNameInput(event.currentTarget.value)
            }
            placeholder="Last Name"
            className="my-2 mr-3 w-0 min-w-0 grow rounded-sm text-black"
          ></input>
        </div>
        <div className="flex w-full items-center">
          <div className="mr-3 hidden text-xl font-semibold sm:block">
            onelink.tk/
          </div>
          <div className="flex flex-1 items-start">
            <input
              type="text"
              value={linkNameInput}
              onChange={(event: FormEvent<HTMLInputElement>) =>
                setLinkNameInput(event.currentTarget.value)
              }
              placeholder="Link Name"
              className="my-2 w-0 grow rounded-sm text-black"
            ></input>
            <span className="pl-1">*</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-2 rounded-full bg-white px-5 py-2 text-lg font-bold text-black"
          >
            Login
          </button>
        </div>
      </form>
      <div className="my-2 text-red-300">{error || ''}</div>
    </div>
  );
};
export default Register;
