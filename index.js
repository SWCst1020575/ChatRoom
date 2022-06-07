import LoginForm from './src/component/loginForm'
import SignUpForm from './src/component/signupform'
import MyAlert from './src/component/myalert'
import Chatroom from './src/component/chatroom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Switch } from '@mui/material';


export class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticationType: "Signin",
            AlertState: {
                isShow: 0,
                msg: ""
            }
        };
        this.config = {
            apiKey: "AIzaSyBBQ0YebwWCFRcUa-kbN7z6MMYxhlyuSIY",
            authDomain: "chatroom-dcb3f.firebaseapp.com",
            projectId: "chatroom-dcb3f",
            storageBucket: "chatroom-dcb3f.appspot.com",
            messagingSenderId: "273503432827",
            appId: "1:273503432827:web:68273204def6fdf57db2de",
            databaseURL: "https://chatroom-dcb3f-default-rtdb.firebaseio.com",
        };
        firebase.initializeApp(this.config);
        document.addEventListener('DOMContentLoaded', () => {
            if (!Notification) {
                alert('Desktop notifications not available in your browser. Try Chromium.');
                return;
            }
            if (Notification.permission !== 'granted')
                Notification.requestPermission();
        });
    };
    notifyMsg(title, content) {
        if (Notification.permission !== 'granted')
            Notification.requestPermission();
        else {
            var notification = new Notification(title, {
                icon: 'src/img/appIcon.png',
                body: content,
            });
        }
    }
    componentDidMount() {
    };
    renderAuthenticationTypeChange = () => {
        var nowState = this.state;
        if (this.state.authenticationType == "Signin")
            nowState["authenticationType"] = "Signup";
        else
            nowState["authenticationType"] = "Signin";
        this.setState({ nowState });
    }
    setAlertState = (isAlertShow, errorMsg) => {
        var nowState = this.state;
        if (isAlertShow == 0)
            nowState["AlertState"] = { isShow: isAlertShow, msg: "" }
        else
            nowState["AlertState"] = { isShow: isAlertShow, msg: errorMsg }
        this.setState({ nowState });
    }

    showAlert = () => {
        if (this.state.AlertState.isShow)
            return (
                <MyAlert
                    setAlertState={this.setAlertState}
                    msg={this.state.AlertState.msg}
                />
            );
    }
    checkLogined = () => {
    }
    render() {
        return (
            <div id="reactRender">
                <BrowserRouter>
                    {this.showAlert()}
                    {/* {this.renderAuthenticationForm()} */}
                    <Routes>
                        <Route path='/' element={
                            <Chatroom
                                notifyMsg={this.notifyMsg}
                            />
                        } />
                        <Route path='/signin' element={
                            <LoginForm
                                setAlertState={this.setAlertState}
                                setUserData={this.setUserData}
                            />
                        } />
                        <Route path="/signup" element={
                            <SignUpForm
                                setAlertState={this.setAlertState}
                            />
                        } />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));