"use client";

import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { StarIcon } from 'lucide-react';

export const ReviewSection = ({stars, rating_mode}) => {
  const [value, setValue] = useState<number | null>(stars);
  

  if (rating_mode === "controlled") {
    return (
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Typography component="legend" className='font-medium pl-5'>{value} étoiles</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          emptyIcon={<StarIcon color='#FF495F' className='pt-1' size={27}/>}
        />
      </Box>
    );
  } else if (rating_mode === "read-only") {
    return (
      <>
        <Typography component="legend" className='font-medium pl-5 flex justify-center items-center'>{value} étoiles</Typography>
        <div className='flex justify-center items-center'>
          <Rating name="read-only" value={value} readOnly size="large" emptyIcon={<StarIcon color='#FF495F' className='pt-1' size={27}/>} />
        </div>
      </>
    );
  } else if (rating_mode === "disabled") {
    return (
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Typography component="legend" className='font-medium pl-5'>{value} étoiles</Typography>
        <Rating name="disabled" value={value} emptyIcon={<StarIcon color='#FF495F' className='pt-1' size={27}/>} disabled />
      </Box>
    );
  } else if (rating_mode === "no-value") {
    return (
      <Rating name="no-value" value={null} emptyIcon={<StarIcon color='#FF495F' className='pt-1' size={27}/>} className='justify-self-center' />
    );
  }

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="no-value" value={null} />
    </Box>
  );
}
