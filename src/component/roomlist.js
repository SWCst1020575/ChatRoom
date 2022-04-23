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
    CircularProgress,
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
        firebase.database().ref('RoomList/' + props.userListData.RoomID).off()
        firebase.database().ref('RoomList/' + props.userListData.RoomID).on('value', (snapshot) => {
            var nowRoomData = snapshot.val();
            if (nowRoomData == null) {
                setRoomData(null);
                return () => {
                    firebase.database().ref('RoomList/' + props.userListData.RoomID).off();
                };
            }
            if (nowRoomData.RoomPhotoUrl == 'default')
                nowRoomData.RoomPhotoUrl = '/src/img/defaultRoomIcon.png';
            if (nowRoomData.RoomLatestContent.length > 24)
                nowRoomData.RoomLatestContent = nowRoomData.RoomLatestContent.substr(0, 24) + '...'
            setRoomData(nowRoomData);
            setIsLoading(false);
        });
        return () => {
            firebase.database().ref('RoomList/' + props.userListData.RoomID).off();
        }
    }, [props.userListData, props.myUserData]);
    if (roomData == null)
        return null
    const clickRoom = (RoomID) => {
        props.setNowRoomID(RoomID);
        /*firebase.database().ref('UserData/' + props.userID + '/UserRoomList').orderByChild("RoomID").equalTo(RoomID).once('value', (snapshot) => {
            firebase.database().ref('UserData/' + props.userID + '/UserRoomList/' + Object.keys(snapshot.val())[0]).update({
                RoomFinalUpdateNum: roomData.RoomContentNum,
                RoomID: RoomID
            })
        });*/
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
        <Box className="roomList">
            <ListItemButton sx={{ height: '100%' }} onClick={() => { clickRoom(props.userListData.RoomID) }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar className="roomListPhoto" >
                        <Avatar  sx={{ width: '100%', height: '100%' }} alt="Remy Sharp" src={roomData.RoomPhotoUrl} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                        <Container className='roomListRoomName' sx={{ paddingLeft: "0px !important", color: 'white', fontSize: "24px" }}>
                            {roomData.RoomName}
                        </Container>
                        }
                        secondary={
                            <Container className='roomListRoomLatestContent' sx={{ wordWrap: 'break-word', textOverflow: 'ellipsis', paddingLeft: "12px !important", color: 'white', fontSize: "18px" }}>
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
