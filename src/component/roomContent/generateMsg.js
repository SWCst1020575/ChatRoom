import {
    Dialog,
    DialogContent,
    CircularProgress
} from '@mui/material';
import MsgDiv from './msgDiv';

export default function GenerateMsg(props) {
    const [msgList, setMsgList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        if (props.roomID == '')
            return;
        setIsLoading(true);
        firebase.database().ref('RoomContent/' + props.roomID).on("value", snapshot => {
            var roomMsg = snapshot.val();
            var nowMsgList = [];
            for (var i in roomMsg) {
                if (roomMsg[i].user == 'prompt')
                    nowMsgList.push(<MsgDiv content={roomMsg[i].content} type='prompt' />);
                else if (props.myUserData.UserID == roomMsg[i].user)
                    nowMsgList.push(<MsgDiv content={roomMsg[i].content} type='self' userID={roomMsg[i].user} />);
                else
                    nowMsgList.push(<MsgDiv content={roomMsg[i].content} type='other' userID={roomMsg[i].user} />);
            }
            setMsgList(nowMsgList);
            setIsLoading(false);
            document.getElementById('roomContentDiv').scrollTop = document.getElementById('roomContent').scrollHeight;
        })
    }, [props.roomID])
    if (msgList == [])
        return null
    else
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