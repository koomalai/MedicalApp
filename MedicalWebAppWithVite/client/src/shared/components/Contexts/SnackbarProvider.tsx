import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import React, { SyntheticEvent, createContext, useContext, useMemo, useState } from "react";

interface SnackbarContextInterface {
  showSnackBar: (message: string, alertColor: AlertColor, title: string) => void;
}

export const SnackbarContext = createContext({} as SnackbarContextInterface);

type SnackbarProviderProps = {
  children: React.ReactNode;
};

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  const handleClose = (
    event: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const showSnackBar = (message: string, alertColor: AlertColor, title: string) => {
    setMessage(message);
    setSeverity(alertColor);
    setTitle(title);
    setOpen(true);
  };

  const getSnackbarValue = useMemo(() => ({ showSnackBar }), []);

  return (
    <SnackbarContext.Provider value={getSnackbarValue}>
      {children}
      <Snackbar
        key={message}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        aria-busy="false"
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export default SnackbarProvider;
