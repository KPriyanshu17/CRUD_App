import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [newTask, setNewTask] = useState('')
  const [newCategory, setNewCategory] = useState('work')
  const [newPriority, setNewPriority] = useState('medium')
  const [newDueDate, setNewDueDate] = useState('')
  const [editTask, setEditTask] = useState({ id: null, text: '', category: '', priority: '', dueDate: '' })
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        category: newCategory,
        priority: newPriority,
        dueDate: newDueDate,
        createdAt: new Date().toISOString()
      }
      setTasks([...tasks, task])
      setNewTask('')
      setNewDueDate('')
    }
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleEditClick = (task) => {
    setEditTask({
      ...task,
      text: task.text,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate
    })
    setOpenDialog(true)
  }

  const handleEditSave = () => {
    if (editTask.text.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === editTask.id ? { 
            ...task, 
            text: editTask.text.trim(),
            category: editTask.category,
            priority: editTask.priority,
            dueDate: editTask.dueDate
          } : task
        )
      )
      setOpenDialog(false)
      setEditTask({ id: null, text: '', category: '', priority: '', dueDate: '' })
    }
  }

  return (
    <Card
      component={motion.div}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      sx={{
        backdropFilter: 'blur(10px)',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(25, 118, 210, 0.4) 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 2
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          Task Manager
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            onClick={handleAddTask}
            startIcon={<AddIcon />}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }}
          >
            Add
          </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newCategory}
                label="Category"
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="shopping">Shopping</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newPriority}
                label="Priority"
                onChange={(e) => setNewPriority(e.target.value)}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size="small"
              type="date"
              label="Due Date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>

        <List>
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ListItem
                  component={motion.div}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(245, 0, 87, 0.1))',
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  }}
                  sx={{
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    borderRadius: 1,
                    mb: 1,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ListItemText 
                    primary={task.text}
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          label={task.category}
                          size="small"
                          sx={{
                      background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(245, 0, 87, 0.05) 100%)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 1,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      mb: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(245, 0, 87, 0.1) 100%)',
                      }, mr: 1 }}
                        />
                        <Chip
                          label={task.priority}
                          size="small"
                          color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'}
                          sx={{
                      background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(245, 0, 87, 0.05) 100%)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 1,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      mb: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(245, 0, 87, 0.1) 100%)',
                      }, mr: 1 }}
                        />
                        {task.dueDate && (
                          <Chip
                            label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleEditClick(task)}
                      sx={{
                      background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(245, 0, 87, 0.05) 100%)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 1,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      mb: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(245, 0, 87, 0.1) 100%)',
                      }, mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                autoFocus
                fullWidth
                label="Task"
                value={editTask.text}
                onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={editTask.category}
                  label="Category"
                  onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
                >
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="shopping">Shopping</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={editTask.priority}
                  label="Priority"
                  onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="date"
                label="Due Date"
                value={editTask.dueDate}
                onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default TaskManager