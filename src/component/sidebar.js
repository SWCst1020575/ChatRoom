import {
    Grid,
    Avatar,
    Container,
    List,
    Paper,
    Stack,
    ButtonGroup,
    Button,
    IconButton
} from '@mui/material';
import {
    Logout as LogoutIcon,
    AddCircleOutline as AddRoomIcon,
    AccountCircle as ProfileSettingIcon,
    ArrowDropDown as DropDownIcon
} from '@mui/icons-material';
import RoomList from './roomlist';
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
    };
    componentDidMount() {
    };
    roomListRender = () => {
        var renderList = [];
        for (var i = 0; i < 15; i++)
            renderList.push(<RoomList />)
        return (renderList);
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
                            My Name
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
                            <IconButton size="large" edge='False' sx={{ ...(sideBarStyles().bottomButtonStyle), color: "white" }}>
                                <ProfileSettingIcon sx={{ height: "40px", width: "40px", left: "3px", position: "relative" }} />
                                <DropDownIcon sx={{ left: "-3px", position: "relative" }} />
                            </IconButton >
                        </Paper>
                    </Grid>
                </Grid>
                <Container id="roomListDiv" className={this.props.classes.roomListDiv}>
                    <List className={this.props.classes.roomListStyle} sx={{ paddingColor: '#2c3e50', paddingTop: "0px", paddingBottom: '0px', width: '100%', bgcolor: 'background.paper' }}>
                        {this.roomListRender()}
                    </List>
                </Container>
                <Grid container id="sideBarBottom" sx={{ justifyContent: "center", alignItems: "center" }} className={this.props.classes.sideBarBottom}>
                    <ButtonGroup variant="contained" size="large" aria-label="small button group" sx={{ width: '100%', height: '100%' }}>
                        <Button sx={{ ...(sideBarStyles().bottomButtonStyle), width: '50%', fontSize: '20px', fontFamily: 'functionFont' }}>
                            <AddRoomIcon sx={{ width: '28px', height: '28px', marginRight: '8px' }} />
                            Create
                        </Button>
                        <Button sx={{ ...(sideBarStyles().bottomButtonStyle), width: '50%', fontSize: '20px', fontFamily: 'functionFont' }}>
                            <LogoutIcon sx={{ width: '28px', height: '28px', marginRight: '8px' }} />
                            Logout
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    };
}

export default withStyles(sideBarStyles)(SideBar);