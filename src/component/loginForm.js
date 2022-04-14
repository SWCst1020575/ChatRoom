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
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.bodyStyles = {
            backgroundRepeat: "no-repeat",
            backgroundImage: "linear-gradient(rgb(115, 212, 254), rgb(140, 121, 209))"
        };
    };
    userSignin = () => {
        var email = document.getElementById('inputEmail').value;
        var password = document.getElementById('inputPassword').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById('inputEmail').value = "";
                document.getElementById('inputPassword').value = "";
                this.props.setAlertState(1, errorMessage);
            });
    }
    userGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
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
                <div id="custom-alert">
                </div>
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card" src="/src/img/appIcon.png" />
                    <p id="profile-name" className="profile-name-card"></p>
                    <div className="form-signin">
                        <span id="reauth-email" className="reauth-email"></span>
                        <div className='inputDiv'>
                            <TextField id="inputEmail" className={classes.input} variant="outlined" label="Email" type="email" />
                            <PasswordInput idName="inputPassword" className={classes.input}/>
                        </div>
                        <div id="remember" className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div>
                        <button id="btnSignin" className="btn btn-lg btn-primary btn-block btn-signin" onClick={() => this.userSignin()}>Sign in</button>
                        <button id="btnGoogle" className="btn btn-lg btn-primary btn-block btn-google" onClick={() => this.userGoogle()}>
                            <img id="googleIcon" src="src/img/googleIcon.png" />
                        </button>
                    </div>
                    <a href="/signup" className="create-account">
                        Create a new account.
                    </a>
                </div>
            </div>
        );
    }
}

export default withStyles(inputStyles)(LoginForm);