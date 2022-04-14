import {
    Snackbar,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import { Alert, } from '@material-ui/lab'
const alertStyles = theme => ({
    alertStyle: {
        position: 'absolute',
        left: 'calc(100vw/2)',
        transform: 'translateX(-50%)',
        top: '15px',
        fontSize: '20px',
        width: '90%',
    },
});


class MyAlert extends React.Component {
    constructor(props) {
        super(props);

    };
    render() {
        return (
            <Alert
                onClose={() => { this.props.setAlertState(0, 0) }}
                className={this.props.classes.alertStyle} severity="error">
                {"Error : " + this.props.msg}
            </Alert>);
    }
}

export default withStyles(alertStyles)(MyAlert);