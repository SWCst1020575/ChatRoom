import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    DialogContentText,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@mui/material';

export default function RoomExit(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleClickConfirm = () => {
        setIsLoading(true);
        var nowTime = new Date;
        firebase.database().ref('UserData/' + props.myUserData.UserID + '/UserRoomList').once('value', (snapshot) => {
            var roominUserData = snapshot.val();
            var roomIndexinUserData = Object.keys(roominUserData).find(key => roominUserData[key].RoomID === props.roomID);
            roominUserData.splice(roomIndexinUserData, 1);
            firebase.database().ref('UserData/' + props.myUserData.UserID + '/UserRoomList').set(roominUserData).then(() => {
                firebase.database().ref('RoomList/' + props.roomID + '/RoomMemberList').once('value', (roomSnapshot) => {
                    var userinRoomData = roomSnapshot.val();
                    var userIndexinRoomData = Object.keys(userinRoomData).find(key => userinRoomData[key] === props.myUserData.UserID);
                    userinRoomData.splice(userIndexinRoomData, 1);
                    if (userinRoomData.length == 0) {
                        firebase.database().ref('RoomList/' + props.roomID).remove();
                        firebase.database().ref('RoomContent/' + props.roomID).remove();
                    }
                    else
                        firebase.database().ref('RoomList/' + props.roomID + '/RoomMemberList').set(userinRoomData);
                })
            });
        }).then(() => {
            firebase.database().ref('RoomContent/' + props.roomID).push({
                user: 'prompt',
                content: (props.myUserData.UserName + ' left this room.'),
                time: nowTime.getTime(),
                userPhotoUrl: ''
            })
        }).finally(() => { 
            props.setNowRoomID('');
            setIsLoading(false); });
        handleDialogClose();
    }
    const handleDialogClose = () => {
        props.setIsRoomExitOpen(false);
    };
    return (
        <div>
            <Dialog open={props.isOpen} onClose={handleDialogClose} >
                <DialogTitle>Exit room</DialogTitle>
                <DialogContentText align='left' sx={{ marginLeft: '40px', marginRight: '40px', maxWidth: '400px', width: '100%' }}>
                    Please click confirm button if you really want to leave this room.
                </DialogContentText>
                <DialogActions>
                    <Button variant="standard" onClick={handleDialogClose}>Cancer</Button>
                    <Button variant="standard" onClick={handleClickConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isLoading} PaperProps={{ style: { boxShadow: 'none', backgroundColor: 'transparent' } }}>
                <DialogContent >
                    <CircularProgress size={70} />
                </DialogContent>
            </Dialog>
        </div>
    );
}