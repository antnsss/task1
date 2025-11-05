'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Typography, Box, Button } from '@mui/material'

export default function Home() {
  const router = useRouter()

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Todo App
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Manage your tasks efficiently
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => router.push('/auth/login')}
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push('/auth/register')}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  )
}