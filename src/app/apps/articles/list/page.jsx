// Component Imports
import ArticleList from '@/views/apps/articles/list'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/articles`)

  if (!res.ok) {
    throw new Error('Failed to fetch articles')
  }

  return res.json()
}

const ArticlesApp = async () => {
  // Vars
  const data = await getData()

  return <ArticleList articleData={data} />
}

export default ArticlesApp
