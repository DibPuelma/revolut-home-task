import React, { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Lottie from 'lottie-react';
import { MessagingContext } from '../../context/MessagingContext';
import successAnimation from '../../assets/animations/success-check.json';

const Alert = () => {
  const {
    alertOpen,
    alertMessage,
    alertType,
    setAlertOpen,
  } = useContext(MessagingContext);

  const handleClose = () => setAlertOpen(false);

  return (
    <Dialog
      open={alertOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        {alertType === 'error' ? 'Error' : 'Transaction succesful'}
      </DialogTitle>
      <DialogContent>
        {alertType === 'error' ? (
          <DialogContentText id="alert-dialog-description">
            {alertMessage}
          </DialogContentText>
        ) : (
          <Lottie
            data-testid="animation"
            animationData={successAnimation}
            loop={false}
            size={100}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button data-testid="accept-button" onClick={handleClose}>Accept</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
