import {
    TextField,
    LinearProgress
} from '@mui/material';
import { withStyles } from '@mui/styles'
import PasswordInput from './passwordinput';
const inputStyles = theme => ({
    input: {
        marginBottom: '15px !important',
        width: '100%',
    },
});
function MyLinearProgress(props) {
    const isShow = props.isProgessShow;
    if (isShow) {
        return (<LinearProgress sx={{ position: 'absolute', top: '0', left: '0', width: '100%' }} />);
    }
    return null;
}
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.bodyStyles = {
            backgroundRepeat: "no-repeat",
            backgroundImage: "linear-gradient(rgb(115, 212, 254), rgb(140, 121, 209))"
        };
        this.state = {
            isProgess: false
        }
    }
    userSignup = () => {
        this.setState({ isProgess: true });
        var username = document.getElementById('inputUserName').value;
        var email = document.getElementById('inputEmail').value;
        var password = document.getElementById('inputPassword').value;
        var passwordconfirm = document.getElementById('inputComfirmPassword').value;
        if (password != passwordconfirm) {
            this.props.setAlertState(1, "Passwords didn’t match. Please try again.");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
            var user = userCredential.user;
            firebase.database().ref('UserData').push({
                UserName: username,
                UserEmail: email,
                UserPhotoUrl: "default",
                UserRoomList: {}
            }).then(() => { window.location.href = "/signin"; });
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.props.setAlertState(1, errorMessage);
        }).finally(() => { this.setState({ isProgess: false }) });
    }
    componentDidMount() {
        for (var i in this.bodyStyles)
            document.body.style[i] = this.bodyStyles[i];
    };
    render() {
        const { classes } = this.props;
        return (
            <div className="container">
                <div className="card card-container">
                    <MyLinearProgress isProgessShow={this.state.isProgess} />
                    <img id="profile-img" className="profile-img-card" src="/src/img/appIcon.png" />
                    <p id="profile-name" className="profile-name-card"></p>
                    <div className="form-signin">
                        <span id="reauth-email" className="reauth-email"></span>
                        <TextField id="inputUserName" className={classes.input} variant="outlined" label="User Name (optional)" type="text" />
                        <TextField id="inputEmail" className={classes.input} variant="outlined" label="Email" type="email" />
                        <PasswordInput idName="inputPassword" className={classes.input} />
                        <PasswordInput idName="inputComfirmPassword" className={classes.input} />
                        <button id="btnSignup" className="btn btn-lg btn-primary btn-block btn-signup" type="submit" onClick={() => this.userSignup()}>Sign up</button>
                    </div>
                    <a href="/signin" className="return-signin">
                        Return to sign in.
                    </a>
                </div>
            </div>
        );
    }
}

export default withStyles(inputStyles)(SignUpForm);