import {
    List,
} from '@mui/material';
import RoomList from './roomlist';


export default function GenerateRoomList(props) {
    const [displayRoomList, setDisplayRoomList] = React.useState(false);
    React.useEffect(() => {
        if (displayRoomList == false)
            roomListUpdate()
    }, [props.UserID]);
    const roomListUpdate = () => {
        var roomList = [];
        firebase.database().ref('UserData/' + props.UserID + '/UserRoomList').on('value', (snapshot) => {
            var RoomListData = snapshot.val();
            for (var key in RoomListData)
                roomList.push(RoomListData[key]);
            roomList.sort((a, b) => { return a.RoomFinalUpdateDate - b.RoomFinalUpdateDate });
            setDisplayRoomList(roomList);
        });
    }
    const roomListRender = () => {
        var renderList = [];
        for (var i in displayRoomList)
            renderList.push(<RoomList userListData={displayRoomList[i]} />)
        //for (var i = 0; i < 15; i++)
        return (renderList);
    }
    return (
        <List className={props.className} sx={{ paddingColor: '#2c3e50', paddingTop: "0px", paddingBottom: '0px', width: '100%' }}>
            {roomListRender()}
        </List>
    );
}