import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
export default function RoomInvite(props) {
    const [inviteUserEmail, setInviteUserEmail] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [alertType, setAlertType] = React.useState({
        severity: 'error',
        content: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const handleDialogClickOK = () => {
        var newMember = document.getElementById('inviteUserEmail').value;
        if (!isEmailValid(newMember)) {
            showError('The email address is badly formatted.')
            return;
        }
        var nowUserEmail = []
        for (var key of props.roomData.RoomMemberList)
            firebase.database().ref('UserData/' + key).once('value', (snapshot) => {
                nowUserEmail.push(snapshot.val().UserEmail);
            })
        if (nowUserEmail.includes(newMember)) {
            showError('The member was in this room.')
            return;
        }
        setIsLoading(true);
        firebase.database().ref('UserData').orderByChild("UserEmail").equalTo(newMember).once("value", snapshot => {
            if (!(snapshot.exists())) {
                showError('The member does not exist.')
                return;
            }
            var targetUserData = snapshot.val();
            var targetUserDataKey = (Object.keys(targetUserData))[0]
            firebase.database().ref('RoomList/' + props.roomID + '/RoomMemberList').once('value', (snapshot) => {
                var nowRoomMemberList = Object.values(snapshot.val())
                nowRoomMemberList.push(targetUserDataKey)
                firebase.database().ref('RoomList/' + props.roomID + '/RoomMemberList').update(nowRoomMemberList);
            }).catch(error => {
                showError(error);
                setIsLoading(false);
            }).then(() => {
                var nowTargetUserRoomList = [];
                if (targetUserData[targetUserDataKey].UserRoomList != null)
                    nowTargetUserRoomList = Object.values(targetUserData[targetUserDataKey].UserRoomList)
                nowTargetUserRoomList.push({
                    RoomFinalUpdateNum: props.roomData.RoomContentNum,
                    RoomID: props.roomID
                })

                firebase.database().ref('UserData/' + targetUserDataKey + '/UserRoomList').update(nowTargetUserRoomList);
                var promptMsg = targetUserData[targetUserDataKey].UserName + ' was invited.';
                var nowTime = new Date;
                firebase.database().ref('RoomContent/' + props.roomID).push({
                    user: 'prompt',
                    content: promptMsg,
                    time: nowTime.getTime(),
                    userPhotoUrl: ''
                })
            })
        }).catch(error => {
            showError(error);
            setIsLoading(false);
        }).then(() => {
            setAlertType({
                severity: 'success',
                content: 'Invite successfully'
            })
            setSnackbarOpen(true);
            setIsLoading(false);
        })
        /*firebase.database().ref('RoomList/' + props.roomID).once('value', (snapshot) => {
            var RoomMemberList = Object.values(snapshot.val().RoomMemberList);
            RoomMemberList.push()
        })*/
        handleDialogClose();
    };
    const handleDialogClose = () => {
        props.setIsRoomInviteOpen(false);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const showError = (error) => {
        setAlertType({
            severity: 'error',
            content: error
        })
        setSnackbarOpen(true);
    }
    const isEmailValid = (email) => {
        if (email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]*$/
        ))
            return true;
        else
            return false;
    }
    return (
        <div>
            <Dialog open={props.isOpen} onClose={handleDialogClose} >
                <DialogTitle>Edit room</DialogTitle>
                <DialogContentText align='left' sx={{ marginLeft: '40px', width: '300px' }}>
                    Please enter the user's email.
                </DialogContentText>
                <DialogContent>
                    <TextField
                        id="inviteUserEmail"
                        margin="dense"
                        label="User Email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="standard" onClick={handleDialogClose}>Cancel</Button>
                    <Button variant="standard" onClick={handleDialogClickOK}>OK</Button>
                </DialogActions>

            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={alertType.severity} sx={{ fontSize: '18px', width: '100%' }}>
                    {alertType.content}
                </Alert>
            </Snackbar>
            <Dialog open={isLoading} PaperProps={{ style: { boxShadow: 'none', backgroundColor: 'transparent' } }}>
                <DialogContent >
                    <CircularProgress size={70} />
                </DialogContent>
            </Dialog>
        </div>
    );
}