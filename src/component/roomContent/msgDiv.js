import {
    Typography,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Paper
} from '@mui/material';


export default function MsgDiv(props) {
    const [msgType, setMsgType] = React.useState('other');
    const [msgUser, setMsgUser] = React.useState('self');
    const [msgContent, setMsgContent] = React.useState('self');
    if (msgType == 'other')
        return (
            <Card sx={{ marginLeft: '3%', marginTop: '15px', marginBottom: '15px', maxWidth: '40%', }}>
                <CardContent>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ width: '50px', height: '50px', bgcolor: 'azure' }} />
                        }
                        titleTypographyProps={{ fontSize: '28px' }}
                        title="User Name"
                    />
                    <Typography variant="body2" sx={{ fontSize: '20px' }}>
                        一一一一一一
                    </Typography>
                </CardContent>
            </Card>
        );
    else if (msgType == 'self')
        return (
            <Card sx={{ backgroundColor: '#aaeaff', marginLeft: '57%', marginTop: '15px', marginBottom: '15px', maxWidth: '40%', }}>
                <CardContent>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ width: '50px', height: '50px', bgcolor: 'azure' }} />
                        }
                        title="User Name"
                        titleTypographyProps={{ fontSize: '28px' }}
                    />
                    <Typography variant="body2" sx={{ fontSize: '20px' }}>
                        一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一
                    </Typography>
                </CardContent>
            </Card>
        );
    else if (msgType == 'prompt')
        return (
            <Paper sx={{ borderRadius: '8px', backgroundColor: 'rgba(100,100,100,0.2)', width: 'fit-content', maxWidth: '60%', margin: 'auto', marginTop: '15px', marginBottom: '15px' }}>
                <Typography sx={{ fontSize: '18px', width: 'fit-content', margin: 'auto', paddingLeft: '40px', paddingRight: '40px' }} >
                    ... was invited.
                </Typography>
            </Paper >
        );
}