import {
    Grid,
    Avatar,
    Container,
    List,
    Paper,
    Stack
} from '@mui/material';
import GenerateRoomList from './generateRoomList';
import MyProfile from './myprofile';
import CreateRoomDialog from './createroomdialog'
import { withStyles } from '@mui/styles';

const sideBarStyles = theme => ({
    sideBarStyle: {
        backgroundColor: '#304458',
        height: '100%'
    },
    roomListStyle: {
        width: '100%',
        height: '100%',
        overflowY: "scroll",
        overflowX: "hidden"
    },
    roomListDiv: {
        height: '75%',
        width: '100%',
        paddingLeft: '8px',
        backgroundColor: '#2c3e50'
    },
    myProfileDiv: {
        height: '15%',
    },
    sideBarBottom: {
        height: '10%'
    },
    functionText: {
        height: '100%',
        fontSize: '24px',
        fontFamily: 'functionFont'
    },
    bottomButtonStyle: {
        borderColor: 'transparent !important',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: '#435f7a',
        },
    }
});

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserID: '',
            displayRoomList: []
        };
    };
    componentDidUpdate() {
    };
    userLogout() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.href = "/signin";
        }).catch((error) => {
            // An error happened.

        });
    }
    getGridSize = () => {
        if (this.props.windowSize.width < 1000)
            return 12;
        else
            return 3;
    }
    render() {
        return (
            <Grid className={this.props.classes.sideBarStyle} item xs={this.getGridSize()}>
                <Grid container className={this.props.classes.myProfileDiv} id="profileDiv">
                    <Grid item xs={4}>
                        <Paper
                            sx={{ backgroundColor: 'transparent' }}
                            className={this.props.classes.functionText}
                            justifyContent="center"
                            alignItems="center"
                            elevation={0}
                            component={Stack}>
                            <Avatar
                                alt="myPic"
                                id="myPhoto"
                                src={this.props.myUserData.UserPhotoUrl}
                                sx={{ width: 64, height: 64, }}
                            />
                        </Paper>
                    </Grid >
                    <Grid item xs={4.5}>
                        <Paper
                            sx={{ backgroundColor: 'transparent', color: 'white' }}
                            className={this.props.classes.functionText}
                            justifyContent="center"
                            elevation={0}
                            component={Stack}
                            id="myName">
                            {this.props.myUserData.UserName}
                        </Paper>
                    </Grid>
                    <Grid item xs={3.5}>
                        <Paper
                            sx={{ backgroundColor: 'transparent', color: 'white' }}
                            className={this.props.classes.functionText}
                            justifyContent="center"
                            alignItems="center"
                            elevation={0}
                            component={Stack}>
                            <MyProfile userData={this.props.myUserData} />
                        </Paper>
                    </Grid>
                </Grid>
                <Container id="roomListDiv" className={this.props.classes.roomListDiv}>
                    <GenerateRoomList
                        setNowRoomID={this.props.setNowRoomID}
                        offLoading={this.props.offLoading}
                        roomList={this.props.myUserData.UserRoomList}
                        myUserData={this.props.myUserData}
                        className={this.props.classes.roomListStyle} />
                </Container>
                <Grid container id="sideBarBottom" sx={{ justifyContent: "center", alignItems: "center" }} className={this.props.classes.sideBarBottom}>
                    <CreateRoomDialog windowSize={this.props.windowSize} myID={this.props.myUserData.UserID} myEmail={this.props.myUserData.UserEmail} logoutFun={this.userLogout} />
                </Grid>
            </Grid>
        );
    };
}

export default withStyles(sideBarStyles)(SideBar);