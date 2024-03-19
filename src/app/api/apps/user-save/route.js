// Next Imports
import { NextResponse } from 'next/server'

import { saveUser } from '@/lib/users'

export async function POST(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })

    return
  }

  const data = await req.json()

  // console.log('in route Post request', data)

  const response = await saveUser(data)

  // console.log('[Route API User List]', data)

  return NextResponse.json({ success: 204 })
}
