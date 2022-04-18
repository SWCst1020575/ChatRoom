import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ButtonGroup,
    Snackbar,
    Alert,
    IconButton
} from '@mui/material';
import {
    AddCircleOutline as AddRoomIcon,
    Logout as LogoutIcon,
    Image as ImageIcon,
} from '@mui/icons-material';
const sideBarStyles = theme => ({
    buttonStyle: {
        borderColor: 'transparent !important',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: '#435f7a',
        },
    },
});
export default function CreateRoomDialog(props) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [alertType, setAlertType] = React.useState({
        severity: 'error',
        content: ''
    });
    const [imageFileName, setImageFileName] = React.useState('Select image as room photo.');
    const handleDialogClickOK = () => {
        var newRoomName = document.getElementById('createRoomNameInput').value;
        var newRoomImageFileName = imageFileName
        if (newRoomName == '')
            newRoomName = 'Room Name';
        if (newRoomImageFileName == 'Select image as room photo.')
            newRoomImageFileName = 'default'
        var nowTime = new Date;
        firebase.database().ref('RoomList').push({
            RoomName: newRoomName,
            RoomPhotoUrl: newRoomImageFileName,
            RoomLatestContent: '(Empty)',
            RoomLatestContentDate: nowTime.getTime(),
            RoomContentNum: 0,
            RoomMemberList: [props.myID],
            RoomContent: {}
        }).then((snapshot) => {
            const RoomKey = snapshot.key;
            firebase.database().ref('UserData/' + props.myID).once("value", userSnapshot => {
                var userData = userSnapshot.val();
                var roomList = [];
                if ('UserRoomList' in userData)
                    for (var key in userData['UserRoomList'])
                        roomList.push((userData.UserRoomList)[key]);
                roomList.push({ RoomID: RoomKey, RoomFinalUpdateDate: nowTime.getTime(), RoomFinalUpdateNum: 0 });
                firebase.database().ref('UserData/' + props.myID + '/UserRoomList').update(roomList).then(() => {
                    setAlertType({
                        severity: 'success',
                        content: 'Create room successfully'
                    })
                    setDialogOpen(false);
                    setSnackbarOpen(true);
                });
            });
            firebase.database().ref('RoomContent/' + RoomKey).push({
                user: 'prompt',
                content: 'Room has been created.',
                time: nowTime.getTime(),
                userPhotoUrl: ''
            })
        });
    };
    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const roomPhotoUpload = () => {
        document.getElementById("roomPhotoUploadFileButton").click();
    };
    return (
        <div id="buttonDivStyle">
            <ButtonGroup variant="contained" size="large" aria-label="small button group" sx={{ width: '100%', height: '100%' }}>
                <Button className="sidebarButtonStyle" onClick={handleClickOpen} sx={{ ...(sideBarStyles().bottomButtonStyle), width: '50%', fontSize: '20px', fontFamily: 'functionFont' }}>
                    <AddRoomIcon sx={{ width: '28px', height: '28px', marginRight: '8px' }} />
                    Create
                </Button>
                <Dialog open={dialogOpen} onClose={handleDialogClose} >
                    <DialogTitle>Create new room</DialogTitle>
                    <DialogContentText align='center' sx={{ marginLeft: '30px', marginRight: '30px' }}>
                        <IconButton onClick={roomPhotoUpload} size="large" sx={{ marginRight: "10px" }}>
                            <ImageIcon size="large" />
                            <input onChange={() => {
                                var fileName = document.getElementById("roomPhotoUploadFileButton").value;
                                const validExt = [".png", ".jpg", ".jpeg", ".png", ".ico", ".bmp"];
                                var fileExt = fileName.substring(fileName.lastIndexOf('.'));
                                var isValid = false;
                                for (var i in validExt)
                                    if (validExt[i] == fileExt)
                                        isValid = true;
                                if (fileName == '') {
                                    setAlertType({
                                        severity: 'warning',
                                        content: 'Please choose a file'
                                    })
                                    setSnackbarOpen(true);
                                }
                                else if (!isValid) {
                                    setAlertType({
                                        severity: 'error',
                                        content: 'This file type is not allowed'
                                    })
                                    setSnackbarOpen(true);
                                }
                                else
                                    setImageFileName(fileName)
                            }} id="roomPhotoUploadFileButton" type="file" accept=".png,.jpg,.jpeg,.png,.ico,.bmp" hidden />
                        </IconButton>
                        {imageFileName}
                    </DialogContentText>
                    <DialogContent>
                        <TextField
                            id="createRoomNameInput"
                            margin="dense"
                            label="Room Name"
                            type="text"
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
                <Button
                    className="sidebarButtonStyle"
                    onClick={() => { props.logoutFun() }}
                    sx={{ ...(sideBarStyles().bottomButtonStyle), width: '50%', fontSize: '20px', fontFamily: 'functionFont' }}>
                    <LogoutIcon sx={{ width: '28px', height: '28px', marginRight: '8px' }} />
                    Logout
                </Button>
            </ButtonGroup>

        </div >
    );
}