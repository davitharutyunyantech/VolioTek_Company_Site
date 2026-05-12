import { connection } from 'next/server';

import App from './App';

export default async function Page() {
  await connection();

  return <App />;
}
