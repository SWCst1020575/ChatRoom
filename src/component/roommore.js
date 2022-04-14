import {
    Box,
    SpeedDial,
    SpeedDialAction
} from '@mui/material';
import {
    MoreHoriz as MoreIcon,
    PersonAdd as PersonAddIcon,
    ExitToApp as ExitRoomIcon,
    Person as MemberListIcon,
    Delete as ClearIcon,
    Edit as RoomSettingIcon
} from '@mui/icons-material';

export default function RoomMoreButton() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box sx={{ position: 'relative', width: '40px', height: '40px' }}>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{}}
                icon={<MoreIcon fontSize="large" />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
                FabProps={{ size: "small", style: { boxShadow: 'none', backgroundColor: "transparent", color: 'white' } }}
            >
                <SpeedDialAction
                    key="Room"
                    icon={<RoomSettingIcon />}
                    tooltipTitle="Room"
                    tooltipOpen
                    onClick={handleClose}
                />
                <SpeedDialAction
                    key="Menber"
                    icon={<MemberListIcon />}
                    tooltipTitle="Menber"
                    tooltipOpen
                    onClick={handleClose}
                />
                <SpeedDialAction
                    key="Invite"
                    icon={<PersonAddIcon />}
                    tooltipTitle="Invite"
                    tooltipOpen
                    onClick={handleClose}
                />
                <SpeedDialAction
                    key="Clear"
                    icon={<ClearIcon />}
                    tooltipTitle="Clear"
                    tooltipOpen
                    onClick={handleClose}
                />
                <SpeedDialAction
                    key="Exit"
                    icon={<ExitRoomIcon />}
                    tooltipTitle="Exit"
                    tooltipOpen
                    onClick={handleClose}
                />
            </SpeedDial>
        </Box>
    );
}