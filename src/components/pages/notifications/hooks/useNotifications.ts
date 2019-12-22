import { useState, useEffect } from 'react';

const useNotifications = () => {
  const [isNotificationsResultsDialogOpen, setIsNotificationsResultsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({});
};

export default useNotifications;
