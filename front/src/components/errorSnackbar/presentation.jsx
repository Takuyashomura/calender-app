import React from "react";
import { IconButton, Snackbar } from "@material-ui/core";
import { Close, Warning } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const usestyles = makeStyles(theme => ({
    message: {
        display: "flex",
        alignItems: "enter"
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    }
}));

const ErrorSnackbar = ({ error, handleClose }) => {
    const classes = usestyles();

    return (
        <Snackbar
            open={ !!error }
            onClose={ handleClose }
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message={
                <span className={ classes.message }>
                    <Warning className={ [classes.icon, classes.iconVariant].join("") }/>
                    { error }
                </span>
            }
            action={
                <IconButton color="inherit" onClick={ handleClose }>
                    <Close className={ classes.icon }/>
                </IconButton>
            }
            />
    )
};

export default ErrorSnackbar;