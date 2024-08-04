'use client'

import * as React from 'react';
import { useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function Home() {

  const [artist, setArtist] = useState('RT')

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  const CSSTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  });


  const Title = styled(Paper)(({ theme }) => ({
    backgroundColor: '#242424',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    fontFamily: ['FranieSemiBold', 'sans-serif'],
    fontSize: '50px',
    color: '#fff',
  }));

  function findArtist() {
    console.log(artist);
  }


  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      backgroundColor = '#242424'
      gap={1}>
        <Stack
          height="850px"
          width="1200px"
          direction={'column'}
          display={'flex'}
          alignItems={'center'}
          spacing={1}
          color={'white'}>
            <Title elevation={24} sx = {{border: '2px solid #fff', borderRadius: '100px'}}>Spotify Song Sorter</Title>
            <Box height="3500px"></Box>
            <Stack
              height="700px"
              width="200px"
              direction={'row'}
              display={'flex'}
              spacing={2}
              justifyContent={'center'}
              alignItems={'center'}
              >
              
                <CSSTextField
                  id="outlined-basic"
                  label="Artist"
                  onChange={(e) => setArtist(e.target.value)}
                  sx={{ input: { color: 'white', borderColor: 'white' } }}
                  />
                <Button variant="contained" onClick={findArtist}>Submit</Button>
            </Stack>
        </Stack>
    </Box>
  );
}
