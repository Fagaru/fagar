import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export const ReviewSection = ({stars, rating_mode}) => {
  const [value, setValue] = React.useState<number | null>(stars);

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
        />
      </Box>
    );
  } else if (rating_mode === "read-only") {
    return (
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Typography component="legend" className='font-medium pl-5'>{value} étoiles</Typography>
        <Rating name="read-only" value={value} readOnly />
      </Box>
    );
  } else if (rating_mode === "disabled") {
    return (
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Typography component="legend" className='font-medium pl-5'>{value} étoiles</Typography>
        <Rating name="disabled" value={value} disabled />
      </Box>
    );
  } else if (rating_mode === "no-value") {
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
