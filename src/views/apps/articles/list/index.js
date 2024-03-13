// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ArticleListTable from './ArticleListTable'
import ArticleListCards from './ArticleListCards'

const ArticleList = ({ articleData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ArticleListCards />
      </Grid>
      <Grid item xs={12}>
        <ArticleListTable tableData={articleData} />
      </Grid>
    </Grid>
  )
}

export default ArticleList
