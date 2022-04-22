import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Image as ImageIcon,
} from '@mui/icons-material';
export default function RoomEdit(props) {
    const [nowRoomName, setNowRoomName] = React.useState(props.roomData.RoomName);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [alertType, setAlertType] = React.useState({
        severity: 'error',
        content: ''
    });
    const [imageFileName, setImageFileName] = React.useState('Select image as room photo.');
    const [imageFile, setImageFile] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const handleDialogClickOK = () => {
        var newRoomName = document.getElementById('roomNameInput').value;
        var newRoomData = props.roomData;
        if (newRoomName == '')
            newRoomName = nowRoomName;
        newRoomData.RoomName = newRoomName;
        setIsLoading(true);
        if (imageFile != '')
            firebase.storage().ref().child('RoomPhoto').child(props.roomID).put(imageFile).catch(error => {
                setIsLoading(false);
                showError(error);
            }).then(() => {
                firebase.storage().ref().child('RoomPhoto').child(props.roomID).getDownloadURL()
                    .catch((error) => {
                        setIsLoading(false);
                        showError(error);
                    }).then(function (url) {
                        firebase.database().ref('RoomList/' + props.roomID).update({
                            RoomName: newRoomName,
                            RoomPhotoUrl: url,
                            RoomLatestContent: props.roomData.RoomLatestContent,
                            RoomLatestContentDate: props.roomData.RoomLatestContentDate,
                            RoomContentNum: props.roomData.RoomContentNum,
                            RoomMemberList: props.roomData.RoomMemberList
                        }).catch(error => {
                            setIsLoading(false);
                            showError(error);
                        }).finally(() => {
                            setIsLoading(false);
                            handleDialogClose();
                        });
                    });
            });
        else
            firebase.database().ref('RoomList/' + props.roomID).update({
                RoomName: newRoomName,
                RoomPhotoUrl: props.roomData.RoomPhotoUrl,
                RoomLatestContent: props.roomData.RoomLatestContent,
                RoomLatestContentDate: props.roomData.RoomLatestContentDate,
                RoomContentNum: props.roomData.RoomContentNum,
                RoomMemberList: props.roomData.RoomMemberList
            }).catch(error => {
                setIsLoading(false);
                showError(error);
            }).finally(() => {
                setIsLoading(false);
                handleDialogClose();
            });
    };
    const handleDialogClose = () => {
        props.setIsRoomEditOpen(false);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const roomPhotoUpload = () => {
        document.getElementById("roomPhotoUploadFileButton").click();
    };
    const showError = (error) => {
        setAlertType({
            severity: 'error',
            content: error
        })
        setSnackbarOpen(true);
    }
    return (
        <div>
            <Dialog open={props.isOpen} onClose={handleDialogClose} >
                <DialogTitle>Edit room</DialogTitle>
                <DialogContentText align='center' sx={{ marginLeft: '60px', marginRight: '60px' }}>
                    <IconButton onClick={roomPhotoUpload} size="large" sx={{ marginRight: "10px" }}>
                        <ImageIcon size="large" />
                        <input onChange={(event) => {
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
                            else {
                                setImageFileName(fileName)
                                setImageFile(event.target.files[0]);
                            }
                        }} id="roomPhotoUploadFileButton" type="file" accept=".png,.jpg,.jpeg,.png,.ico,.bmp" hidden />
                    </IconButton>
                    {imageFileName}
                </DialogContentText>
                <DialogContent>
                    <TextField
                        id="roomNameInput"
                        margin="dense"
                        label="Room Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={props.roomData.RoomName}
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