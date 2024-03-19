import { db } from './db'

export async function getUsers() {
  return await db.user.findMany({
    orderBy: [
      {
        fullName: 'desc'
      }
    ]
  })
}

export async function saveUser(postData) {
  // const body = JSON.parse(req.body)

  // console.log('[saveUser Lib]', postData)

  return await db.user.create({
    data: postData
  })
}

export async function deleteUser(postData) {
  const userId = postData.user_id

  // console.log('[delete database library]', userId)

  return await db.user.delete({
    where: {
      id: userId
    }
  })
}
