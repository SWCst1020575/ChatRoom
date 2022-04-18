import {
    Typography,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Paper,
    IconButton
} from '@mui/material';
import {
    Delete as DeleteIcon
} from '@mui/icons-material';

export default function MsgDiv(props) {
    const [msgUserName, setMsgUserName] = React.useState('');
    const [msgUserPhotoUrl, setMsgUserPhotoUrl] = React.useState('');
    const [msgContent, setMsgContent] = React.useState([]);
    React.useEffect(() => {
        if (props.type == 'prompt')
            return;
        firebase.database().ref('UserData/' + props.userID).once("value", snapshot => {
            var userData = snapshot.val();
            setMsgUserName(userData.UserName);
            setMsgUserPhotoUrl(userData.UserPhotoUrl);
        })
    }, []);
    React.useEffect(() => {
        var contentList = (props.content).split('\n');
        var nowMsgContent = [];
        for (var i in contentList)
            nowMsgContent.push(<Typography variant="body2" sx={{ fontSize: '20px' }}>{contentList[i]}</Typography>);
        setMsgContent(nowMsgContent)

    }, [props.content]);
    if (props.type == 'other')
        return (
            <Card sx={{ wordWrap: 'break-word', marginLeft: '3%', marginTop: '15px', marginBottom: '15px', maxWidth: '40%', }}>
                <CardContent>
                    <CardHeader
                        avatar={<Avatar src={msgUserPhotoUrl} sx={{ width: '50px', height: '50px', bgcolor: 'azure' }} />}
                        titleTypographyProps={{ fontSize: '28px' }}
                        title={msgContent}
                    />
                    {nowMsgContent}
                </CardContent>
            </Card>
        );
    else if (props.type == 'self')
        return (
            <Card sx={{ wordWrap: 'break-word', backgroundColor: '#aaeaff', marginLeft: '57%', marginTop: '15px', marginBottom: '15px', maxWidth: '40%', }}>
                <CardContent>
                    <CardHeader
                        avatar={
                            <Avatar src={msgUserPhotoUrl} sx={{ width: '50px', height: '50px', bgcolor: 'azure' }} />
                        }
                        action={
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                        title={msgUserName}
                        titleTypographyProps={{ fontSize: '28px' }}
                    />
                    {msgContent}
                </CardContent>
            </Card>
        );
    else if (props.type == 'prompt')
        return (
            <Paper sx={{ borderRadius: '8px', backgroundColor: 'rgba(100,100,100,0.2)', width: 'fit-content', maxWidth: '60%', margin: 'auto', marginTop: '15px', marginBottom: '15px' }}>
                <Typography sx={{ fontSize: '18px', width: 'fit-content', margin: 'auto', paddingLeft: '40px', paddingRight: '40px' }} >
                    {props.content}
                </Typography>
            </Paper >
        );
    else
        return null;
}