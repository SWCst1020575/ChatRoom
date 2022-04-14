import {
    Grid,
    Paper,
    IconButton,
    Stack,
    Avatar,
    Typography,
    Container
} from '@mui/material';
import {
    Image as ImageIcon,
    Send as SendIcon
} from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import RoomMoreButton from './roommore';
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
            roomName: 'Room Name',
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
            <Grid id="roomDiv" className={this.props.classes.roomStyle} item xs={10} md={9}>
                <Grid id="roomNameDiv" container className={this.props.classes.roomNameDiv} >
                    <Grid item xs={11} >
                        <Stack direction="row" alignItems="center" sx={{ top: '50%', transform: 'translateY(-50%)', position: 'relative' }} >
                            <Avatar
                                alt="myPic"
                                src="/src/img/defaultUserIcon.png"
                                sx={{ width: '56px', height: '56px', marginLeft: '50px' }}
                            />
                            <Typography
                                sx={{ marginLeft: '30px', fontSize: '22px' }}
                            >
                                {this.state.roomName}
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

                </div>
                <div id="roomSubmitDiv" className={this.props.classes.roomSubmitDiv}>
                    <textarea
                        type="text" id="chatContent" placeholder="Send a message."
                    />
                    <div id="sendButtonDiv">
                        <IconButton id="addImageButton" className={this.props.classes.sendButtonStyle}>
                            <ImageIcon className={this.props.classes.sendButtonIconStyle} />
                        </IconButton>
                        <IconButton id="sendMsgButton" className={this.props.classes.sendButtonStyle}>
                            <SendIcon className={this.props.classes.sendButtonIconStyle} />
                        </IconButton>
                    </div>
                </div>
            </Grid>
        );
    };
}

export default withStyles(roomStyles)(Room);