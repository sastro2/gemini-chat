import { METHODS } from 'http';
import React from 'react';

const test = async() => {
  const response = await fetch('/api/endpoints/auth/authenticateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({usernameInput: 'test', passwordInput: 'test'})
  });
};

export default function Test() {
  return <button onClick={() => test()}>Test</button>;
}