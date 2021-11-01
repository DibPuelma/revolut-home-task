import React, { useState, useContext } from 'react';
import {
  Dialog,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  TextField,
  InputAdornment,
} from '@mui/material';
import { KeyboardArrowDown, ArrowBackIos, Search } from '@mui/icons-material';
import { MainContext } from '../../MainContext';
import CurrencyType from '../../types/currency';

type Props = {
  currentCurrency: string,
};

// const Transition = React.forwardRef((props, ref) => (

// );

const CurrencySelect = ({ currentCurrency }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { currenciesWithBalance } = useContext(MainContext);

  const currencyFilter = (currency: CurrencyType) => (
    currency.symbol.toLowerCase().includes(search.toLowerCase())
    || currency.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        variant="text"
        endIcon={<KeyboardArrowDown />}
        onClick={handleClickOpen}
      >
        {currentCurrency}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      // TransitionComponent={<Slide direction="up" />}
      >
        <Container maxWidth="xs">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <ArrowBackIos />
          </IconButton>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="standard"
          />
          <List>
            {currenciesWithBalance
              .filter(currencyFilter)
              .map((currency, i) => (
                <React.Fragment key={currency.symbol}>
                  <ListItem button>
                    <ListItemText
                      primary={`${currency.symbol} - ${currency.balance}`}
                      secondary={currency.name}
                    />
                  </ListItem>
                  {i < currenciesWithBalance.length - 1 && <Divider />}
                </React.Fragment>
              ))}
          </List>
        </Container>
      </Dialog>
    </>
  );
};

export default CurrencySelect;
