import {
    List,
    Dialog,
    DialogContent,
    CircularProgress
} from '@mui/material';
import RoomList from './roomlist';


export default function GenerateRoomList(props) {
    const [displayRoomList, setDisplayRoomList] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        var roomList = [];
        setIsLoading(true);
        //firebase.database().ref('UserData/' + props.UserID + '/UserRoomList').off();
        firebase.database().ref('UserData/' + props.UserID + '/UserRoomList').once('value', (snapshot) => {
            var RoomListData = snapshot.val();
            for (var key in RoomListData)
                roomList.push(RoomListData[key]);
            roomList.sort((a, b) => { return b.RoomFinalUpdateDate - a.RoomFinalUpdateDate });
            setDisplayRoomList(roomList);
            setIsLoading(false);
        });
    }, [props.roomList]);
    const roomListRender = () => {
        var renderList = [];
        for (var i in displayRoomList)
            renderList.push(<RoomList key={displayRoomList[i].RoomID} setNowRoomID={props.setNowRoomID} userID={props.UserID} userListData={displayRoomList[i]} roomKey={i} />)
        //for (var i = 0; i < 15; i++)

        return (renderList);
    }
    return (
        <List className={props.className} sx={{ paddingColor: '#2c3e50', paddingTop: "0px", paddingBottom: '0px', width: '100%' }}>
            {roomListRender()}
            <Dialog open={isLoading} PaperProps={{ style: { boxShadow: 'none', backgroundColor: 'transparent' } }}>
                <DialogContent >
                    <CircularProgress size={70} />
                </DialogContent>
            </Dialog>
        </List>
    );
}