import { FormEvent, useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';
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
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={usernameInput}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setUsernameInput(event.currentTarget.value)
            }
          />
        </div>
        <div>
          <input
            type="text"
            value={passwordInput}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setPasswordInput(event.currentTarget.value)
            }
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};
export default Login;
