// MUI Export

import { UserService } from '@/services';

// Components Export

export default function Home({ users }: any) {
  return (
    <>
      <h1>Home</h1>
      {users.map((user: any) => (
        <h6 key={user.userName}>{user.userName}</h6>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const us = new UserService();
  return {
    props: {
      users: await us.getAll()
    }
  };
}
