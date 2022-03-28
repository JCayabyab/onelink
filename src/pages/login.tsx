import { FormEvent, useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGlobalContext } from '@/contexts/GlobalContext';

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
      const { user: userFromBackend } = await res.data;
      if (userFromBackend) {
        setUser(userFromBackend);
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
      <h1 className="font-sans text-6xl font-bold">OneLink</h1>
      <h2 className="mb-4 font-sans text-2xl font-bold">
        https://onelink.tk/...
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
