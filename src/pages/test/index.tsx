import { METHODS } from 'http';
import React from 'react';

const test = async() => {
  const response = await fetch('/api/endpoints/users/addUser');
  const data = await response.json();
  console.log(data);
};

export default function Test() {
  return <button onClick={() => test()}>Test</button>;
}