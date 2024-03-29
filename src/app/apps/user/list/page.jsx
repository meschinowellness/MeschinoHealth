import { getUsers } from '@/lib/users'

import UserList from '@/views/apps/user/list'

export const dynamic = 'force-dynamic'

const getData = async () => {
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const UserListApp = async () => {
  // Vars
  const data = await getData()

  return <UserList userData={data} />
}

export default UserListApp
