import {
    Grid,
    Dialog,
    CircularProgress,
    DialogContent
} from '@mui/material';
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
            nowRoomID: "",
            isLoading: true,
            UserData: {}
        }
        this.nowUserData = {};
        let componentThis = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.database().ref('UserData').orderByChild("UserEmail").equalTo(user.email).once("value", snapshot => {
                    var nowData = (Object.values(snapshot.val()))[0];
                    componentThis.nowUserData = {
                        UserID: Object.keys(snapshot.val()),
                        UserName: nowData.UserName,
                        UserEmail: nowData.UserEmail,
                        UserPhotoUrl: nowData.UserPhotoUrl,
                        UserRoomList: nowData.UserRoomList
                    }
                    if (componentThis.nowUserData.UserPhotoUrl == 'default')
                        componentThis.nowUserData.UserPhotoUrl = '/src/img/defaultUserIcon.png';
                }).then(() => {
                    var nowState = componentThis.state;
                    nowState.UserData = componentThis.nowUserData;
                    nowState.isLoading = false;
                    componentThis.setState({ nowState })
                })
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
                <SideBar myUserData={this.state.UserData} />
                <Room />
                <Dialog open={this.state.isLoading} PaperProps={{ style: { boxShadow: 'none', backgroundColor: 'transparent' } }}>
                    <DialogContent >
                        <CircularProgress size={70} />
                    </DialogContent>
                </Dialog>
            </Grid >
        );
    };
}

export default withStyles(chatRoomStyles)(Chatroom);