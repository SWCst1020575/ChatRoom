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
export default function MyProfile() {
    const [open, setOpen] = React.useState(false);
    const [imageFileName, setImageFileName] = React.useState('Select image as your photo.');
    const [myUserName, setMyUserName] = React.useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <IconButton onClick={handleClickOpen} size="small" edge='False' sx={{ ...(sideBarStyles().buttonStyle), color: "white" }}>
                <ProfileSettingIcon sx={{ height: "40px", width: "40px", left: "3px", position: "relative" }} />
                <DropDownIcon sx={{ left: "-3px", position: "relative" }} />
            </IconButton >
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>My profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can change your photo or user name here.
                    </DialogContentText>
                    <DialogContentText align='center'>
                        <IconButton size="large" sx={{ marginRight: "10px" }}>
                            <ImageIcon size="large" />
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
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}