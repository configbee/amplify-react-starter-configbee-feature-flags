
// @ts-nocheck
import type { Schema } from '../../data/resource';

export const handler: Schema['sayHello']['handler'] = async (event) => {
  // arguments typed from `.arguments()`
  const { name } = event.arguments
  // return typed from `.returns()`
  return `Hello Velu 7777, ${name}!`
}