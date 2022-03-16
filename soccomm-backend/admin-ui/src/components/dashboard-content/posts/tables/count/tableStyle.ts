import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 150,
    backgroundColor: '#efebe9',
  },
  tableContainer: {
    borderRadius: 15,
    // maxWidth: 250,
    marginLeft: 30,
    marginTop: 30,
    // height: 234,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#002884',
  },
}))

export { useStyles }
