import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Task } from '../../types/task'
import { useMutation } from '@apollo/client'
import { UPDATE_TASK } from '../mutations/taskMutations'
import { GET_TASKS } from '../queries/taskQueries'
import { useNavigate } from 'react-router-dom'

export default function EditTask({
  task,
  userId,
}: {
  task: Task
  userId: number
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(task.name)
  const [description, setDescription] = useState(task.description)
  const [isInvalidName, setIsInvalidName] = useState(false)
  const navigate = useNavigate()

  const [updateTask] = useMutation<{ updateTask: Task }>(UPDATE_TASK)

  const resetState = () => {
    setName(task.name)
    setDescription(task.description)
    setIsInvalidName(false)
  }

  const handleEditTask = async () => {
    let canEdit = true

    if (name.length === 0) {
      canEdit = false
      setIsInvalidName(true)
    } else {
      setIsInvalidName(false)
    }

    if (canEdit) {
      const updateTaskInput = { id: task.id, name, description }
      try {
        await updateTask({
          variables: { updateTaskInput },
          refetchQueries: [{ query: GET_TASKS, variables: { userId } }],
        })
        resetState()
        setOpen(false)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('token')
          alert('トークンの有効期限が切れました。サインイン画面に遷移します。')
          navigate('/signin')
          return
        }

        alert('タスクの編集に失敗しました。')
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    resetState()
    setOpen(false)
  }

  return (
    <div>
      <Tooltip title="編集">
        <IconButton onClick={handleClickOpen}>
          <EditIcon color="action" />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="normal"
            id="name"
            label="Task Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={isInvalidName}
            helperText={isInvalidName && 'タスク名を入力してください'}
          />
          <TextField
            autoFocus
            margin="normal"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditTask}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
