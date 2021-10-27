import { Box, Button, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  counterSelector,
  decrement,
  increment,
  incrementAsync
} from 'store/slices';

const Home = () => {
  const [amount, setAmount] = useState<number>(0);
  const counter = useAppSelector(counterSelector);
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    dispatch(increment());
  };

  const handleDecrease = () => {
    dispatch(decrement());
  };

  const handleIncreaseAsync = () => {
    dispatch(incrementAsync(amount));
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };
  return (
    <Box>
      <Typography variant="h2" align="center">
        {counter.value}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleDecrease} variant="contained">
          Decrease
        </Button>
        <Button onClick={handleIncrease} variant="contained">
          Increase
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Input value={amount} onChange={handleChangeAmount} type="number" />
        <Button
          onClick={handleIncreaseAsync}
          variant="contained"
          disabled={counter.loading}>
          Increase async
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
