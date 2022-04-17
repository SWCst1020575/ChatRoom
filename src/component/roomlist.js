import {
    Avatar,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Box,
    Container,
    Dialog,
    DialogContent,
    CircularProgress
} from '@mui/material'

export default function RoomList(props) {
    const [roomData, setRoomData] = React.useState({
        RoomContentNum: 0,
        RoomLatestContent: "(Latest Content)",
        RoomLatestContentDate: 0,
        RoomMemberList: [],
        RoomName: "None",
        RoomPhotoUrl: "default"
    });
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        setIsLoading(true);
        firebase.database().ref('RoomList/' + props.userListData.RoomID).on('value', (snapshot) => {
            var nowRoomData = snapshot.val();
            setRoomData(nowRoomData);
            setIsLoading(false);
        });
    }, [props.userListData]);
    return (
        <Box id="roomList">
            <ListItemButton onClick={() => { props.setNowRoomID(props.userListData.RoomID); }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/src/img/defaultUserIcon.png" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Container sx={{ paddingLeft: "0px !important", color: 'white', fontSize: "24px" }}>
                            {roomData.RoomName}
                        </Container>}
                        secondary={
                            <Container sx={{ textOverflow: 'ellipsis', paddingLeft: "12px !important", color: 'white', fontSize: "18px" }}>
                                {roomData.RoomLatestContent}
                            </Container>
                        }
                    />
                </ListItem>
            </ListItemButton>
            <Dialog open={isLoading} PaperProps={{ style: { boxShadow: 'none', backgroundColor: 'transparent' } }}>
                <DialogContent >
                    <CircularProgress size={70} />
                </DialogContent>
            </Dialog>
        </Box>
    );

}
