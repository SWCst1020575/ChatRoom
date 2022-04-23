import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@mui/material';

export default function RoomMember(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [memberList, setMemberList] = React.useState([]);
    React.useEffect(() => {
        var nowMemberList = [];
        if (!(props.isOpen))
            return;
        setIsLoading(true);
        firebase.database().ref('UserData').once('value', (snapshot) => {
            var userData = snapshot.val();
            for (var i of props.roomData.RoomMemberList) {
                var nowUserPhoto = userData[i].UserPhotoUrl;
                if (nowUserPhoto == 'default')
                    nowUserPhoto = '/src/img/defaultUserIcon.png';
                nowMemberList.push(
                    <ListItem key={i}>
                        <ListItemAvatar>
                            <Avatar src={nowUserPhoto}>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={userData[i].UserName} secondary={userData[i].UserEmail} />
                    </ListItem>
                );
            }
            setMemberList(nowMemberList);
            setIsLoading(false);
        });
    }, [props.isOpen])
    const handleDialogClose = () => {
        props.setIsRoomMemberOpen(false);
    };
    return (
        <div>
            <Dialog open={props.isOpen} onClose={handleDialogClose} >
                <DialogTitle>Room member list</DialogTitle>
                <List sx={{ width: '100%', maxWidth: '500px', bgcolor: 'background.paper' }}>
                    {memberList}
                </List>
                <DialogActions>
                    <Button variant="standard" onClick={handleDialogClose}>Close</Button>
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