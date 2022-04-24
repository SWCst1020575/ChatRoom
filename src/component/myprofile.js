import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Alert,
    Snackbar,
    CircularProgress
} from '@mui/material';
import {
    AccountCircle as ProfileSettingIcon,
    ArrowDropDown as DropDownIcon,
    Image as ImageIcon,
} from '@mui/icons-material';
const sideBarStyles = theme => ({
    buttonStyle: {
        borderColor: 'transparent !important',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: '#435f7a',
        },
    }
});
export default function MyProfile(props) {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [imageFileName, setImageFileName] = React.useState('Select image as your photo.');
    const [myUserName, setMyUserName] = React.useState('');
    const [imageFile, setImageFile] = React.useState('');
    const [alertType, setAlertType] = React.useState({
        severity: 'error',
        content: ''
    });
    // TODO: Finish user data update.
    const handleClickOK = () => {
        setIsLoading(true);
        var newUserName = document.getElementById("editProfileUserNameInput").value;
        if (imageFileName == '' || imageFileName == 'Select image as your photo.') {
            firebase.database().ref('UserData/' + props.userData.UserID).update({
                UserName: newUserName
            }).finally(() => {
                setIsLoading(false);
            });
        }
        else {
            firebase.storage().ref().child('UserPhoto').child(props.userData.UserID).put(imageFile).catch(error => {
                setIsLoading(false);
                showError(error);
            }).then((snapshot) => {
                firebase.storage().ref().child('UserPhoto').child(props.userData.UserID).getDownloadURL().catch((error) => {
                    setIsLoading(false);
                    showError(error);
                }).then(function (url) {
                    firebase.database().ref('UserData/' + props.userData.UserID).update({
                        UserName: newUserName,
                        UserPhotoUrl: url
                    }).catch((error) => {
                        setIsLoading(false);
                        showError(error);
                    }).finally(() => {
                        setIsLoading(false);
                        document.getElementById("roomPhotoUploadFileButton").value = '';
                    });
                });
            });
        }
        handleClose();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }
    const showError = (error) => {
        setAlertType({
            severity: 'error',
            content: error
        })
        setSnackbarOpen(true);
    }
    React.useEffect(() => {
        setMyUserName(props.userData.UserName);
    }, [props.userData])
    const roomPhotoUpload = () => {
        document.getElementById("roomPhotoUploadFileButton").click();
    };
    return (
        <div>
            <IconButton id='myProfileButton' onClick={handleClickOpen} size="small" edge='False' sx={{ ...(sideBarStyles().buttonStyle), color: "white" }}>
                <ProfileSettingIcon id='myProfileButtonIcon-1' sx={{ height: "40px", width: "40px", left: "3px", position: "relative" }} />
                <DropDownIcon id='myProfileButtonIcon-2' sx={{ left: "-3px", position: "relative" }} />
            </IconButton >
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>My profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can change your photo or user name here.
                    </DialogContentText>
                    <DialogContentText align='center'>
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
                    <TextField
                        id="editProfileUserNameInput"
                        margin="dense"
                        label="User Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={myUserName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickOK}>OK</Button>
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