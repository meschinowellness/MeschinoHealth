// Next Imports
import { NextResponse } from 'next/server'

// Data Imports
// import { db } from '@/app/api/fake-db/apps/user-list'

import { getUsers } from '@/lib/users'

export async function GET() {
  const data = await getUsers()

  //console.log('[Route API User List]', data)

  return NextResponse.json(data)
}
