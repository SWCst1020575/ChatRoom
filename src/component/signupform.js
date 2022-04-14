import {
    TextField,
} from '@mui/material';
import { withStyles } from '@mui/styles'
import PasswordInput from './passwordinput';
const inputStyles = theme => ({
    input: {
        marginBottom: '15px !important',
        width: '100%',
    },
});
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.bodyStyles = {
            backgroundRepeat: "no-repeat",
            backgroundImage: "linear-gradient(rgb(115, 212, 254), rgb(140, 121, 209))"
        };
    }
    userSignup = () => {
        var email = document.getElementById('inputEmail').value;
        var password = document.getElementById('inputPassword').value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                document.getElementById('inputEmail').value = "";
                document.getElementById('inputPassword').value = "";
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById('inputEmail').value = "";
                document.getElementById('inputPassword').value = "";
                this.props.setAlertState(1, errorMessage);
            });
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
                    <img id="profile-img" className="profile-img-card" src="/src/img/appIcon.png" />
                    <p id="profile-name" className="profile-name-card"></p>
                    <div className="form-signin">
                        <span id="reauth-email" className="reauth-email"></span>
                        <TextField id="inputUserName" className={classes.input} variant="outlined" label="User Name (optional)" type="text" />
                        <TextField id="inputEmail" className={classes.input} variant="outlined" label="Email" type="email" />
                        <PasswordInput idName="inputPassword" className={classes.input}/>                        
                        <PasswordInput idName="inputComfirmPassword" className={classes.input}/>
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