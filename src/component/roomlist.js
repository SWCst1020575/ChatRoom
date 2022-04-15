import {
    Avatar,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Box,
    Container
} from '@mui/material'
import { withStyles } from '@mui/styles'
const roomListStyles = theme => ({
    listStyle: {
    },
    roomListButtonStyle: {
        borderColor: 'transparent !important',
        backgroundColor: '#2c3e50',
        '&:hover': {
            backgroundColor: '#435f7a',
        },
    }
});
// TODO :: Rewrite class component to Hook.
class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: "none",
            latestContent: "Latest Content"
        }
    };
    render() {
        return (
            <Box sx={{ ...(roomListStyles().roomListButtonStyle), borderTop: 0.5, borderColor: 'grey.500' }}>
                <ListItemButton className={this.props.classes.listStyle}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/src/img/defaultUserIcon.png" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Container sx={{ paddingLeft: "0px !important", color: 'white', fontSize: "24px" }}>
                                {this.state.roomName}
                            </Container>}
                            secondary={
                                <Container sx={{ textOverflow: 'ellipsis', paddingLeft: "12px !important", color: 'white', fontSize: "18px" }}>
                                    {this.state.latestContent}
                                </Container>
                            }
                        />
                    </ListItem>
                </ListItemButton>
            </Box>
        );
    }
}

export default withStyles(roomListStyles)(RoomList);