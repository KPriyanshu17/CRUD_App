import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { motion } from 'framer-motion'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import TaskManager from './components/TaskManager'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

function App() {
  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: '#040714',
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: ['#2196f3', '#f50057', '#00bcd4', '#ff9800', '#4caf50'],
            },
            links: {
              color: '#2196f3',
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1.5,
              triangles: {
                enable: true,
                opacity: 0.1
              }
            },
            move: {
              enable: true,
              outModes: {
                default: 'out',
              },
              random: true,
              speed: 3,
              straight: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            opacity: {
              value: 0.7,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            shape: {
              type: ['circle', 'triangle', 'star'],
            },
            size: {
              value: { min: 1, max: 5 },
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
              }
            },
          },
          detectRetina: true,
        }}
      />
      <Container component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        maxWidth="md"
        sx={{
          mt: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <TaskManager />
      </Container>
    </ThemeProvider>
  )
}

export default App
