import { Tooltip, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const DeleteTask = () => {
  return (
    <Tooltip title="削除">
      <IconButton onClick={() => {}}>
        <DeleteIcon color="action" />
      </IconButton>
    </Tooltip>
  )
}

export default DeleteTask
