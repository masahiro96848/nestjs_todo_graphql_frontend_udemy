import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Task } from '../../types/task'
import EditTask from './EditTask'

type Props = {
  tasks: Task[] | undefined
  userId: number
}

export default function TaskTable(props: Props) {
  const { tasks, userId } = props
  return (
    <TableContainer component={Paper} sx={{ width: '70%', m: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell align="left">description</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks?.map((task) => (
            <TableRow
              key={task.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {task.name}
              </TableCell>
              <TableCell align="left">{task.description}</TableCell>
              <TableCell align="left">
                <EditTask task={task} userId={userId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
