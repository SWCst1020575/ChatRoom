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

        setIsLoading(true);
        //firebase.database().ref('UserData/' + props.UserID + '/UserRoomList').once('value', (snapshot) => {
        var RoomListData = props.roomList;
        if (RoomListData == null) {
            setIsLoading(false);
            return
        }
        firebase.database().ref('RoomList').off();
        firebase.database().ref('RoomList').on('value', (roomSnapshot) => {
            var roomListData = roomSnapshot.val()
            var roomList = [];
            for (var roomdata of RoomListData) {
                var nowRoomListData = roomdata;
                nowRoomListData['RoomFinalUpdateDate'] = roomListData[roomdata.RoomID].RoomLatestContentDate;
                roomList.push(nowRoomListData);
            }
            roomList.sort((a, b) => { return b.RoomFinalUpdateDate - a.RoomFinalUpdateDate });
            setDisplayRoomList(roomList);
            setIsLoading(false);
        })
        //});
    }, [props.roomList]);
    const roomListRender = () => {
        var renderList = [];
        for (var i in displayRoomList)
            renderList.push(<RoomList key={displayRoomList[i].RoomID} setNowRoomID={props.setNowRoomID} myUserData={props.myUserData} userListData={displayRoomList[i]} roomKey={i} />)
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