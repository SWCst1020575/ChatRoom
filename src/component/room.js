import {
    Grid,
    Paper,
    IconButton,
    Stack,
    Avatar,
    Typography,
} from '@mui/material';
import {
    Image as ImageIcon,
    Send as SendIcon
} from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import RoomMoreButton from './roommore';
import GenerateMsg from './roomContent/generateMsg'
const roomStyles = theme => ({
    roomStyle: {
        backgroundColor: '#a5ded7',
    },
    roomNameDiv: {
        height: '80px',
    },
    roomContentDiv: {
        height: 'calc(100% - 180px)',
        backgroundColor: 'azure',
    },
    roomSubmitDiv: {
        position: 'relative',
        height: '100px',
    },
    functionText: {
        height: '100%',
        fontSize: '24px',
        fontFamily: 'functionFont'
    },
    topButtonStyle: {
        borderColor: 'transparent !important',
        backgroundColor: 'transparent',
    },
    sendButtonStyle: {
        height: '55px',
        width: '55px',
        marginRight: '10px !important'
    },
    sendButtonIconStyle: {
        height: '34px !important',
        width: '34px !important'
    }
});
class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomData: { RoomName: 'Room Name' },
            isInRoom: false
        }
    };
    componentDidUpdate(prevProps) {
        var componentThis = this;
        if (this.props.roomID != prevProps.roomID)
            firebase.database().ref('RoomList/' + this.props.roomID).on('value', (snapshot) => {
                var RoomData = snapshot.val();
                var nowState = componentThis.state;
                if (RoomData.RoomPhotoUrl == 'default')
                    RoomData.RoomPhotoUrl = '/src/img/defaultRoomIcon.png';
                nowState["roomData"] = RoomData;
                nowState["isInRoom"] = true;
                componentThis.setState(nowState);
            });
    };
    sendMsg = () => {
        var msgInput = document.getElementById('msgContent').value;
        if (this.state.isInRoom && msgInput != '') {
            var nowTime = new Date;
            firebase.database().ref('RoomContent/' + this.props.roomID).push({
                user: this.props.myUserData.UserID,
                content: msgInput,
                time: nowTime.getTime()
            })
            firebase.database().ref('RoomList/' + this.props.roomID).once("value", snapshot => {
                var roomData = snapshot.val();
                roomData['RoomContentNum'] = roomData['RoomContentNum'] + 1;
                roomData['RoomLatestContent'] = msgInput;
                roomData['RoomLatestContentDate'] = nowTime.getTime();
                firebase.database().ref('RoomList/' + this.props.roomID).update(roomData)
            })
            document.getElementById('msgContent').value = '';
        }
    }
    render() {
        return (
            <Grid id="roomDiv" className={this.props.classes.roomStyle} item xs={10} md={9}>
                <Grid id="roomNameDiv" container className={this.props.classes.roomNameDiv} >
                    <Grid item xs={11} >
                        <Stack direction="row" alignItems="center" sx={{ top: '50%', transform: 'translateY(-50%)', position: 'relative' }} >
                            <Avatar
                                alt="myPic"
                                src={this.state.roomData.RoomPhotoUrl}
                                sx={{ width: '56px', height: '56px', marginLeft: '50px' }}
                            />
                            <Typography
                                sx={{ marginLeft: '30px', fontSize: '22px' }}
                            >
                                {this.state.roomData.RoomName}
                            </Typography>
                        </Stack>
                    </Grid >
                    <Grid item xs={1}>
                        <Paper
                            sx={{ position: 'relative', backgroundColor: 'transparent', color: 'white' }}
                            className={this.props.classes.functionText}
                            justifyContent="center"
                            alignItems="center"
                            elevation={0}
                            component={Stack}>
                            {/* <IconButton size="large" edge='False' sx={{ ...(roomStyles().topButtonStyle), color: "white" }}>
                                <MoreIcon sx={{ height: "40px", width: "40px", position: "relative" }} />
                            </IconButton > */}
                            <RoomMoreButton />
                        </Paper>
                    </Grid>
                </Grid>
                <div id="roomContentDiv" className={this.props.classes.roomContentDiv}>
                    <GenerateMsg myUserData={this.props.myUserData} roomID={this.props.roomID} />
                </div>
                <div id="roomSubmitDiv" className={this.props.classes.roomSubmitDiv}>
                    <textarea
                        type="text" id="msgContent" placeholder="Send a message."
                    />
                    <div id="sendButtonDiv">
                        <IconButton id="addImageButton" className={this.props.classes.sendButtonStyle}>
                            <ImageIcon className={this.props.classes.sendButtonIconStyle} />
                        </IconButton>
                        <IconButton id="sendMsgButton"
                            className={this.props.classes.sendButtonStyle}
                            onClick={() => this.sendMsg()}>
                            <SendIcon className={this.props.classes.sendButtonIconStyle} />
                        </IconButton>
                    </div>
                </div>
            </Grid>
        );
    };
}

export default withStyles(roomStyles)(Room);