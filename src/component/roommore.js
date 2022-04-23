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
    Edit as RoomSettingIcon
} from '@mui/icons-material';
import RoomEdit from './roomMoreComponent/roomEdit';
import RoomMember from './roomMoreComponent/roomMember';
import RoomInvite from './roomMoreComponent/roomInvite';
import RoomExit from './roomMoreComponent/roomExit';
export default function RoomMoreButton(props) {
    const [roomData, setRoomData] = React.useState('');
    const [isRoomEditOpen, setIsRoomEditOpen] = React.useState(false);
    const [isRoomMemberOpen, setIsRoomMemberOpen] = React.useState(false);
    const [isRoomInviteOpen, setIsRoomInviteOpen] = React.useState(false);
    const [isRoomExitOpen, setIsRoomExitOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleRoomEdit = () => {
        setIsRoomEditOpen(true);
        setOpen(false);
    }
    const handleRoomMember = () => {
        setIsRoomMemberOpen(true);
        setOpen(false);
    }
    const handleRoomInvite = () => {
        setIsRoomInviteOpen(true);
        setOpen(false);
    }
    const handleRoomExit = () => {
        setIsRoomExitOpen(true);
        setOpen(false);
    }
    if (props.roomID == '')
        return null;
    return (
        <Box sx={{ position: 'relative', width: '60px', height: '60px' }}>
            <SpeedDial
                ariaLabel="More"
                id='SpeedDial'
                icon={<MoreIcon id='SpeedDialIcon' fontSize="large" />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
                sx={{  position: 'absolute' }}
                FabProps={{ size: "small", style: { boxShadow: 'none', backgroundColor: "transparent", color: 'white' } }}
            >
                <SpeedDialAction
                    key="Room"
                    className='SpeedDialAction'
                    icon={<RoomSettingIcon className='SpeedDialActionIcon' />}
                    tooltipTitle="Room"
                    tooltipOpen
                    onClick={handleRoomEdit}
                />
                <SpeedDialAction
                    key="Menber"
                    className='SpeedDialAction'
                    icon={<MemberListIcon className='SpeedDialActionIcon' />}
                    tooltipTitle="Menber"
                    tooltipOpen
                    onClick={handleRoomMember}
                />
                <SpeedDialAction
                    key="Invite"
                    className='SpeedDialAction'
                    icon={<PersonAddIcon className='SpeedDialActionIcon' />}
                    tooltipTitle="Invite"
                    tooltipOpen
                    onClick={handleRoomInvite}
                />
                <SpeedDialAction
                    key="Exit"
                    className='SpeedDialAction'
                    icon={<ExitRoomIcon className='SpeedDialActionIcon' />}
                    tooltipTitle="Exit"
                    tooltipOpen
                    onClick={handleRoomExit}
                />
            </SpeedDial>
            <RoomEdit setIsRoomEditOpen={setIsRoomEditOpen} isOpen={isRoomEditOpen} roomID={props.roomID} roomData={props.roomData} />
            <RoomMember setIsRoomMemberOpen={setIsRoomMemberOpen} isOpen={isRoomMemberOpen} roomID={props.roomID} roomData={props.roomData} />
            <RoomInvite setIsRoomInviteOpen={setIsRoomInviteOpen} isOpen={isRoomInviteOpen} roomID={props.roomID} roomData={props.roomData} />
            <RoomExit setNowRoomID={props.setNowRoomID} setIsRoomExitOpen={setIsRoomExitOpen} myUserData={props.myUserData} isOpen={isRoomExitOpen} roomID={props.roomID} roomData={props.roomData} />
        </Box>
    );
}