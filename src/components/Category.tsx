import { useState } from 'react'
import {
    Box, Typography, Tooltip, IconButton, Card, CardContent, FormGroup, FormControlLabel,
    Checkbox, Chip
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface ListItem {
    checked: boolean,
    title: string,
    due?: Date,
    repeated: boolean,
    subTasks?: {
        checked: boolean,
        title: string
    }[]
}

type CategoryProps = {
    title: string,
}

export default function Category({ title }: CategoryProps) {
    const [data, setData] = useState<[] | ListItem[]>([{
        checked: false,
        title: 'Daily Routine',
        repeated: false
    }, {
        checked: false,
        title: 'Daily Routine',
        repeated: false
    }]);
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='h6' marginRight={1}>
                        {title}
                    </Typography>
                    <Typography variant='subtitle1' component='p' fontSize='medium' lineHeight={2.2} >
                        {data.length}
                    </Typography>
                </Box>
                <Tooltip title='More' placement='top'>
                    <IconButton color='primary'>
                        <MoreHorizIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            {data ? (
                <Box gap={0.5} display='flex' flexDirection='column'>
                    {data.map((item: ListItem) => (
                        <Card sx={{ backgroundColor: '#242424', border: '1px solid #505050' }}>
                            <FormGroup sx={{ ml: 1 }}>
                                <FormControlLabel control={<Checkbox checked={item.checked} sx={{ color: '#505050' }} />} label={item.title} disabled={item.checked} sx={{ color: 'rgba(255, 255, 255, 0.87)' }} />
                            </FormGroup>
                            {item.due && <Chip label={ } />}
                        </Card>
                    ))}
                </Box>) : (
                <></>
            )}
        </Box>
    );
}

function checkDate(value: Date): string {
    const todaysDate = new Date().setHours(0, 0, 0, 0);
    if (value.setHours(0, 0, 0, 0) == todaysDate) {
        return 'Today';
    } else if (todaysDate.setDate(todaysDate.getDate() + 1). == )
}