import {
    Typography,
    Card,
    CardContent,
    CardActionArea
} from '@mui/material';
import MsgDiv from './msgDiv';

export default function GenerateMsg(props) {
    const [msgType, setMsgType] = React.useState('self');

    
    return (
        <div>
            <MsgDiv />
        </div>
    );

}