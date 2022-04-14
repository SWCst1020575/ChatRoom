import {
    Grid,
    Avatar,
    Container,
    List,
    Paper,
    Stack,
    ButtonGroup,
    Button
} from '@mui/material';
import {
    Logout as LogoutIcon
} from '@mui/icons-material';
import RoomList from './roomlist';
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
        height: 'calc(100% - 170px)',
        width: '100%',
        paddingLeft: '8px',
        backgroundColor: '#2c3e50'
    },
    myProfileDiv: {
        height: '100px',
    },
    sideBarBottom: {
        height: '70px'
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
            myUserName: 'My Name',
            myUserPhotoUrl: ''
        }
    };
    componentDidMount() {
    };
    roomListRender = () => {
        var renderList = [];
        for (var i = 0; i < 15; i++)
            renderList.push(<RoomList />)
        return (renderList);
    }
    userLogout() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.href = "/signin";
        }).catch((error) => {
            // An error happened.

        });
    }
    render() {
        return (
            <Grid className={this.props.classes.sideBarStyle} item xs={2} md={3}>
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
                                src="/src/img/defaultUserIcon.png"
                                sx={{ width: 64, height: 64, }}
                            />
                        </Paper>
                    </Grid >
                    <Grid item xs={5}>
                        <Paper
                            sx={{ backgroundColor: 'transparent', color: 'white' }}
                            className={this.props.classes.functionText}
                            justifyContent="center"
                            elevation={0}
                            component={Stack}>
                            {this.state.myUserName}
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper
                            sx={{ backgroundColor: 'transparent', color: 'white' }}
                            className={this.props.classes.functionText}
                            justifyContent="center"
                            alignItems="center"
                            elevation={0}
                            component={Stack}>
                            <MyProfile />
                        </Paper>
                    </Grid>
                </Grid>
                <Container id="roomListDiv" className={this.props.classes.roomListDiv}>
                    <List className={this.props.classes.roomListStyle} sx={{ paddingColor: '#2c3e50', paddingTop: "0px", paddingBottom: '0px', width: '100%', bgcolor: 'background.paper' }}>
                        {this.roomListRender()}
                    </List>
                </Container>
                <Grid container id="sideBarBottom" sx={{ justifyContent: "center", alignItems: "center" }} className={this.props.classes.sideBarBottom}>
                    <CreateRoomDialog logoutFun={this.userLogout} />
                </Grid>
            </Grid>
        );
    };
}

export default withStyles(sideBarStyles)(SideBar);