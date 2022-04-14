import {
    Grid,
    Typography,
} from '@mui/material';
import {
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { withStyles } from '@mui/styles';

import SideBar from './sidebar';
import Room from './room';
const chatRoomStyles = theme => ({

    roomStyle: {
        backgroundColor: 'azure',
    },
});

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowRoomID: ""
        }
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
            } else {
                window.location.href = "/signin";
            }
        });
    };
    componentDidMount() {
    };
    render() {
        return (
            <Grid container id="chatroomDiv">
                <SideBar />
                <Room />
            </Grid >
        );
    };
}

export default withStyles(chatRoomStyles)(Chatroom);