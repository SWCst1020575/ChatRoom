import {
    Dialog,
    DialogContent,
    CircularProgress
} from '@mui/material';
import MsgDiv from './msgDiv';

export default function GenerateMsg(props) {
    const [msgList, setMsgList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [prevRoomID, setPrevRoomID] = React.useState('');
    React.useEffect((prevProps) => {
        if (props.roomID == '')
            return;
        setIsLoading(true);
        setMsgList([]);
        if (prevRoomID != '')
            firebase.database().ref('RoomContent/' + prevRoomID).off();
        firebase.database().ref('RoomContent/' + props.roomID).on('value', snapshot => {
            var roomMsg = snapshot.val();
            var nowMsgList = [];
            for (var i in roomMsg) {
                if (roomMsg[i].user == 'prompt')
                    nowMsgList.push(<MsgDiv key={snapshot.key} content={roomMsg[i].content} type='prompt' />);
                else if (props.myUserData.UserID == roomMsg[i].user)
                    nowMsgList.push(<MsgDiv key={snapshot.key} content={roomMsg[i].content} type='self' userID={roomMsg[i].user} />);
                else
                    nowMsgList.push(<MsgDiv key={snapshot.key} content={roomMsg[i].content} type='other' userID={roomMsg[i].user} />);
            }
            setMsgList(nowMsgList);

            setIsLoading(false);
            document.getElementById('roomContentDiv').scrollTop = document.getElementById('roomContent').scrollHeight;
        })
        setPrevRoomID(props.roomID);
    }, [props.roomID])
    React.useEffect(() => {
        firebase.database().ref('UserData/' + props.myUserData.UserID + '/UserRoomList').orderByChild("RoomID").equalTo(props.roomID).once('value', (snapshot) => {
            var roomList = snapshot.val();
            var key = Object.keys(snapshot.val())[0];
            firebase.database().ref('UserData/' + props.myUserData.UserID + '/UserRoomList/' + key).update({
                RoomFinalUpdateDate: props.roomData.RoomLatestContentDate,
                RoomFinalUpdateNum: props.roomData.RoomContentNum,
                RoomID: roomList[key].RoomID
            })
        });
    }, [props.roomData])
    return (
        <div id='roomContent'>
            {msgList}
            <Dialog open={isLoading} PaperProps={{ style: { boxShadow: 'none', backgroundColor: 'transparent' } }}>
                <DialogContent >
                    <CircularProgress size={70} />
                </DialogContent>
            </Dialog>
        </div>
    );

}