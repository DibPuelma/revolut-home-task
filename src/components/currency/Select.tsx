import React, { useState } from 'react';
import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from '@mui/material';
import { KeyboardArrowDown, ArrowBackIos } from '@mui/icons-material';

type Props = {
  currentCurrency: string,
};

// const Transition = React.forwardRef((props, ref) => (

// );

const CurrencySelect = ({ currentCurrency }: Props) => {
  const [open, setOpen] = useState(false);

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
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <ArrowBackIos />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Default notification ringtone"
                secondary="Tethys"
              />
            </ListItem>
          </List>
        </Container>
      </Dialog>
    </>
  );
};

export default CurrencySelect;
