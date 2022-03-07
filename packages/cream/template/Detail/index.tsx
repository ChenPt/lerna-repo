export function generateDetail(props: { name: string; }) {
  return `
import React from 'react';
export const Detail = () => {
  return <div>${props.name}</div>
}
`
}

