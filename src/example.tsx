import React, { useState } from "react";

const users = [
  {
    id:     1,
    name:   'Ahmed Mohamed',
    age:    13,
    gender: 'male'
  },
  {
    id:     2,
    name:   'Omnia',
    age:    13,
    gender: 'female'
  },
  {
    id:     3,
    name:   'Khaled',
    age:    20,
    gender: 'male'
  }
]

export default function Example() {
  const [count, setCount] = useState(0);

  return <div>Example</div>;
}
