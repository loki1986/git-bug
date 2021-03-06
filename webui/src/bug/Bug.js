import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography/Typography'
import gql from 'graphql-tag'
import React from 'react'
import Author from '../Author'
import Date from '../Date'
import TimelineQuery from './TimelineQuery'

const styles = theme => ({
  main: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 4
  },
  header: {},
  title: {
    ...theme.typography.headline
  },
  id: {
    ...theme.typography.subheading,
    marginLeft: 15,
  },
  container: {
    display: 'flex',
    marginBottom: 30
  },
  timeline: {
    width: '70%',
    marginTop: 20,
    marginRight: 20,
  },
  sidebar: {
    width: '30%'
  },
  label: {
    backgroundColor: '#da9898',
    borderRadius: '3px',
    paddingLeft: '10px',
    margin: '2px 20px auto 2px',
    fontWeight: 'bold',
  }
})

const Bug = ({bug, classes}) => (
  <main className={classes.main}>
    <div className={classes.header}>
      <span className={classes.title}>{bug.title}</span>
      <span className={classes.id}>{bug.humanId}</span>

      <Typography color={'textSecondary'}>
        <Author author={bug.author}/>
        <span> opened this bug </span>
        <Date date={bug.createdAt} />
      </Typography>
    </div>

    <div className={classes.container}>
      <div className={classes.timeline}>
        <TimelineQuery id={bug.id}/>
      </div>
      <div className={classes.sidebar}>
        <Typography variant={'subheading'}>Labels</Typography>
        {bug.labels.map(l => (
          <Typography key={l} className={classes.label}>
            {l}
          </Typography>
        ))}
      </div>
    </div>
  </main>
)

Bug.fragment = gql`
  fragment Bug on Bug {
    id
    humanId
    status
    title
    labels
    createdAt
    author {
      email
      name
    }
  }
`

export default withStyles(styles)(Bug)
