import React from 'react';

interface Props {
  lastName: string;
  name: string;
  age: number;
}

const Component = ({ lastName, name, age }: Props) => (
  <div>
    <h1>
      Name:
      {name}
    </h1>
    <h1>
      Last name:
      {lastName}
    </h1>
    <h1>
      Age:
      {age}
    </h1>
  </div>
);

export default Component;
