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
        if (props.roomID == ''){
            setMsgList([]);
            return;
        }
        setIsLoading(true);
        setMsgList([]);
        firebase.database().ref('RoomContent/' + prevRoomID).off();
        firebase.database().ref('RoomContent/' + props.roomID).on('value', snapshot => {
            var roomMsg = snapshot.val();
            var nowMsgList = [];
            for (var i in roomMsg) {
                if (roomMsg[i].user == 'prompt')
                    nowMsgList.push(<MsgDiv key={i} roomID={props.roomID} msgID={i} msgData={roomMsg[i]} userType='prompt' />);
                else if (props.myUserData.UserID == roomMsg[i].user)
                    nowMsgList.push(<MsgDiv key={i} roomID={props.roomID} msgID={i} msgData={roomMsg[i]} userType='self' />);
                else
                    nowMsgList.push(<MsgDiv key={i} roomID={props.roomID} msgID={i} msgData={roomMsg[i]} userType='other' />);
            }

            setMsgList(nowMsgList);
            setIsLoading(false);
        })
        setPrevRoomID(props.roomID);
        
        return () => {
            firebase.database().ref('RoomContent/' + prevRoomID).off();
        }
    }, [props.roomID])
    React.useEffect(() => {
        if (props.myUserData.UserRoomList == null)
            return;
        firebase.database().ref('UserData/' + props.myUserData.UserID + '/UserRoomList').orderByChild("RoomID").equalTo(props.roomID).once('value', (snapshot) => {
            var roomList = snapshot.val();
            var key = Object.keys(roomList)[0];
            firebase.database().ref('UserData/' + props.myUserData.UserID + '/UserRoomList/' + key).update({
                RoomFinalUpdateNum: props.roomData.RoomContentNum,
                RoomID: roomList[key].RoomID
            })
        });
    }, [props.roomData])
    React.useEffect(() => {
        document.getElementById('roomContentDiv').scrollTop = document.getElementById('roomContent').scrollHeight;
    }, [msgList])
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