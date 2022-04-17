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
                firebase.database().ref('UserData').orderByChild("UserEmail").equalTo(user.email).on("value", snapshot => {
                    var nowData = (Object.values(snapshot.val()))[0];
                    componentThis.nowUserData = {
                        UserID: Object.keys(snapshot.val())[0],
                        UserName: nowData.UserName,
                        UserEmail: nowData.UserEmail,
                        UserPhotoUrl: nowData.UserPhotoUrl,
                        UserRoomList: nowData.UserRoomList
                    }
                    if (componentThis.nowUserData.UserPhotoUrl == 'default')
                        componentThis.nowUserData.UserPhotoUrl = '/src/img/defaultUserIcon.png';
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
    setNowRoomID = (roomID) => {
        var nowState = this.state;
        nowState["nowRoomID"] = roomID;
        this.setState(nowState);
    }
    componentDidUpdate() {
    };
    componentDidMount() {

    };
    render() {
        return (
            <Grid container id="chatroomDiv">
                <SideBar setNowRoomID={this.setNowRoomID} myUserData={this.state.UserData} />
                <Room myUserData={this.state.UserData} roomID={this.state.nowRoomID} />
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