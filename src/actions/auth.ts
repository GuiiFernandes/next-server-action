'use server';

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const loginAction = async (_prevState: any, formData: FormData) => {
  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: formData.get('username'),
      password: formData.get('password'),
    }),
  })
  const data = await response.json();
  if (!response.ok) {
    console.error(data);
    return data;
  }
  await setAuthData(data.token);
  redirect('/protected');
};

export const logoutAction = async () => {
  const cookiesStore = cookies();
  cookiesStore.delete('auth');
  redirect('/login');
};

export const getToken = async () => {
  const authData = await getAuthData();
  return authData?.token;
};

export const getAuthData = async () => {
  const cookiesStore = cookies();
  const auth = cookiesStore.get('auth')?.value;
  if (!auth) {
    return null;
  }
  return JSON.parse(auth);
};

export const setAuthData = async (token: string) => {
  const payloadBase64 = token.split('.')[1]
  const payload = JSON.parse(atob(payloadBase64))
  const cookiesStore = cookies();
  cookiesStore.set('auth', JSON.stringify({token, payload}));
}