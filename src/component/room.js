import {
    Grid,
    Paper,
    IconButton,
    Stack,
    Avatar,
    Typography,
    Alert,
    Snackbar,
    CircularProgress,
    Dialog,
    DialogContent
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
            isInRoom: false,
            alertType: {
                severity: 'error',
                content: 'This file type is not allowed'
            },
            imageFile: '',
            snackbarOpen: false,
            isLoading: false,
        }
    };
    componentDidUpdate(prevProps) {
        var componentThis = this;
        if (this.props.roomID != prevProps.roomID) {
            firebase.database().ref('RoomList/' + prevProps.roomID).off();
            firebase.database().ref('RoomList/' + this.props.roomID).on('value', (snapshot) => {
                var RoomData = snapshot.val();
                var nowState = componentThis.state;
                if (RoomData.RoomPhotoUrl == 'default')
                    RoomData.RoomPhotoUrl = '/src/img/defaultRoomIcon.png';
                nowState["roomData"] = RoomData;
                nowState["isInRoom"] = true;
                componentThis.setState(nowState);
            });
        }
    };
    sendMsg = () => {
        var msgInput = document.getElementById('msgContent').value;
        const componentThis = this;
        if (this.state.isInRoom && msgInput != '') {
            var nowTime = new Date;
            firebase.database().ref('RoomContent/' + this.props.roomID).push({
                user: this.props.myUserData.UserID,
                content: msgInput,
                time: nowTime.getTime(),
                type: 'message'
            })
            firebase.database().ref('RoomList/' + this.props.roomID).once("value", snapshot => {
                var roomData = snapshot.val();
                roomData['RoomContentNum'] = roomData['RoomContentNum'] + 1;
                roomData['RoomLatestContent'] = msgInput;
                roomData['RoomLatestContentDate'] = nowTime.getTime();
                componentThis.setState(roomData);
                firebase.database().ref('RoomList/' + this.props.roomID).update(roomData);
            })
            document.getElementById('msgContent').value = '';
        }
    }
    handleSnackbarClose = () => {
        var nowState = this.state;
        nowState.snackbarOpen = false;
        this.setState(nowState);
    }
    startLoading = (componentThis) => {
        var nowState = componentThis.state;
        nowState.isLoading = true;
        componentThis.setState(nowState);
    }
    endLoading = (componentThis) => {
        var nowState = componentThis.state;
        nowState.isLoading = false;
        componentThis.setState(nowState);
    }
    showError = (error, componentThis) => {
        var nowState = componentThis.state;
        nowState.alertType = {
            severity: 'error',
            content: error
        }
        nowState.snackbarOpen = true;
        nowState.isLoading = false;
        componentThis.setState(nowState);
    }
    sendImg = () => {
        const componentThis = this;
        var nowTime = new Date;
        console.log(this.state.isSendImg)
        if (!(this.state.isInRoom)) {
            document.getElementById("roomSendPhotoButton").value = '';
            return;
        }
        this.startLoading(this);
        firebase.database().ref('RoomContent/' + this.props.roomID).push({
            user: this.props.myUserData.UserID,
            content: '',
            time: nowTime.getTime(),
            type: 'message'
        }).then(snapshot => {
            var newMsgKey = snapshot.key;
            firebase.storage().ref().child('RoomContent').child(componentThis.props.roomID).child(newMsgKey).put(componentThis.state.imageFile).catch(error => {
                componentThis.showError(error, componentThis);
            }).then(() => {
                firebase.storage().ref().child('RoomContent').child(componentThis.props.roomID).child(newMsgKey).getDownloadURL().catch((error) => {
                    componentThis.showError(error, componentThis);
                }).then(function (url) {
                    firebase.database().ref('RoomContent').child(componentThis.props.roomID).child(newMsgKey).update({
                        user: componentThis.props.myUserData.UserID,
                        content: url,
                        time: nowTime.getTime(),
                        type: 'image'
                    }).catch((error) => {
                        componentThis.showError(error, componentThis);
                    }).then(() => {
                        firebase.database().ref('RoomList/' + componentThis.props.roomID).once("value", roomSnapshot => {
                            var roomData = roomSnapshot.val();
                            roomData['RoomContentNum'] = roomData['RoomContentNum'] + 1;
                            roomData['RoomLatestContent'] = url;
                            componentThis.setState(roomData);
                            firebase.database().ref('RoomList/' + componentThis.props.roomID).update(roomData);
                        })
                    }).finally(() => {
                        componentThis.endLoading(componentThis);
                    });
                });
            });
        })


    }
    showRoomTitle = () => {
        if (this.props.roomID != '')
            return (<Stack direction="row" alignItems="center" sx={{ top: '50%', transform: 'translateY(-50%)', position: 'relative' }} >
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
            </Stack>)
    }
    clickSendImg = () => {
        document.getElementById("roomSendPhotoButton").click();
    }
    render() {
        return (
            <Grid id="roomDiv" className={this.props.classes.roomStyle} item xs={10} md={9}>
                <Grid id="roomNameDiv" container className={this.props.classes.roomNameDiv} >
                    <Grid item xs={11} >
                        {this.showRoomTitle()}
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
                            <RoomMoreButton myUserData={this.props.myUserData} roomID={this.props.roomID} roomData={this.state.roomData} />
                        </Paper>
                    </Grid>
                </Grid>
                <div id="roomContentDiv" className={this.props.classes.roomContentDiv}>
                    <GenerateMsg myUserData={this.props.myUserData} roomID={this.props.roomID} roomData={this.state.roomData} />
                </div>
                <div id="roomSubmitDiv" className={this.props.classes.roomSubmitDiv}>
                    <textarea
                        type="text" id="msgContent" placeholder="Send a message."
                    />
                    <div id="sendButtonDiv">
                        <IconButton onClick={this.clickSendImg} id="addImageButton" className={this.props.classes.sendButtonStyle}>
                            <ImageIcon className={this.props.classes.sendButtonIconStyle} />
                            <input onChange={(event) => {
                                var fileName = document.getElementById("roomSendPhotoButton").value;
                                const validExt = [".png", ".jpg", ".jpeg", ".png", ".ico", ".bmp"];
                                var fileExt = fileName.substring(fileName.lastIndexOf('.'));
                                var isValid = false;
                                for (var i in validExt)
                                    if (validExt[i] == fileExt)
                                        isValid = true;
                                if (fileName == '') {
                                    var nowState = this.state;
                                    nowState.alertType = {
                                        severity: 'warning',
                                        content: 'Please choose a file'
                                    }
                                    nowState.snackbarOpen = true;
                                    this.setState(nowState);
                                }
                                else if (!isValid) {
                                    var nowState = this.state;
                                    nowState.alertType = {
                                        severity: 'warning',
                                        content: 'This file type is not allowed'
                                    }
                                    nowState.snackbarOpen = true;
                                    this.setState(nowState);
                                }
                                else {
                                    var nowState = this.state;
                                    nowState.imageFile = event.target.files[0];
                                    this.setState(nowState);
                                    this.sendImg();
                                }
                            }} id="roomSendPhotoButton" type="file" accept=".png,.jpg,.jpeg,.png,.ico,.bmp" hidden />
                        </IconButton>

                        <IconButton id="sendMsgButton"
                            className={this.props.classes.sendButtonStyle}
                            onClick={() => this.sendMsg()}>
                            <SendIcon className={this.props.classes.sendButtonIconStyle} />
                        </IconButton>
                    </div>
                </div>
                <Dialog open={this.state.isLoading} PaperProps={{ style: { boxShadow: 'none', backgroundColor: 'transparent' } }}>
                    <DialogContent >
                        <CircularProgress size={70} />
                    </DialogContent>
                </Dialog>
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={4000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity={this.state.alertType.severity} sx={{ fontSize: '18px', width: '100%' }}>
                        {this.state.alertType.content}
                    </Alert>
                </Snackbar>
            </Grid>
        );
    };
}

export default withStyles(roomStyles)(Room);