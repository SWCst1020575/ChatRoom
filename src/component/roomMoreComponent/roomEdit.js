import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@mui/material';
import {
    Image as ImageIcon,
} from '@mui/icons-material';
export default function MyProfile(props) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [alertType, setAlertType] = React.useState({
        severity: '',
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
        setAlertType({
            severity: 'success',
            content: 'Create room successfully'
        })
        setDialogOpen(false);
        setSnackbarOpen(true);
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
        <Dialog open={dialogOpen} onClose={handleDialogClose} >
            <DialogTitle>Edit room</DialogTitle>
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
        
    );
}