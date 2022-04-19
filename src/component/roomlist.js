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
        firebase.database().ref('RoomList/' + props.userListData.RoomID).once('value', (snapshot) => {
            var nowRoomData = snapshot.val();
            if (nowRoomData.RoomPhotoUrl == 'default')
                nowRoomData.RoomPhotoUrl = '/src/img/defaultRoomIcon.png';
            setRoomData(nowRoomData);
            setIsLoading(false);
        });
    }, [props.userListData]);
    const clickRoom = (RoomID) => {
        props.setNowRoomID(RoomID);
        firebase.database().ref('UserData/' + props.userID + '/UserRoomList').orderByChild("RoomID").equalTo(RoomID).once('value', (snapshot) => {
            firebase.database().ref('UserData/' + props.userID + '/UserRoomList/' + Object.keys(snapshot.val())[0]).update({
                RoomFinalUpdateNum: roomData.RoomContentNum,
                RoomID: RoomID
            })
        });
    }
    const showUnread = () => {
        if (roomData.RoomContentNum > props.userListData.RoomFinalUpdateNum)
            return (
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#2a3dc2' }}>{roomData.RoomContentNum - props.userListData.RoomFinalUpdateNum}</Avatar>
                </ListItemAvatar>
            )
    }
    return (
        <Box id="roomList">
            <ListItemButton onClick={() => { clickRoom(props.userListData.RoomID) }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={roomData.RoomPhotoUrl} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Container sx={{ paddingLeft: "0px !important", color: 'white', fontSize: "24px" }}>
                            {roomData.RoomName}
                        </Container>}
                        secondary={
                            <Container sx={{ wordWrap: 'break-word', textOverflow: 'ellipsis', paddingLeft: "12px !important", color: 'white', fontSize: "18px" }}>
                                {roomData.RoomLatestContent}
                            </Container>
                        }
                    />
                    {showUnread()}
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
