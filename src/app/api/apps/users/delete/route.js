// Next Imports
import { NextResponse } from 'next/server'

import { deleteUser } from '@/lib/users'

export async function DELETE(req, res) {
  if (req.method !== 'DELETE') {
    res.status(405).send({ message: 'Only Delete requests allowed' })

    return
  }

  // console.log('[Route API Delete User]', req)
  const data = await req.json()

  // console.log('[Route API Delete User]', data)
  const response = await deleteUser(data)

  return NextResponse.json({ resp: 'ok' }, { status: 200 })
}
