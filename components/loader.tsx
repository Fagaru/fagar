import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Loader = () =>{
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Box sx={{ width: 300 }} className="space-y-2">
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </div>
  );
}

export default Loader;