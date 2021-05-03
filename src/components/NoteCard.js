import React from 'react'
import { Card, CardHeader, CardContent, IconButton, Typography, Button, makeStyles, Avatar } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { blue, green, red, yellow } from '@material-ui/core/colors'

const useStyles = makeStyles({
    avatar: {
        background: (note) => {
            switch (note.category) {
                case 'work': {
                    return red[400]
                }
                case 'reminders': {
                    return yellow[700]
                }
                case 'todos': {
                    return blue[500]
                }
                case 'money': {
                    return green[500]
                }
                default: {
                    return 'white'
                }
            }

        }
    }
})

export default function NoteCard({ note, handleDelete }) {
    const classes = useStyles(note)

    return (
        <div>
            <Card elevation={1}>
                <CardHeader avatar={
                    <Avatar className={classes.avatar}>
                        {note.category[0].toUpperCase()}
                    </Avatar>
                } action={
                    <IconButton onClick={() => { handleDelete(note.id) }} >
                        <DeleteOutlined />
                    </IconButton>
                } title={note.title} subheader={note.category} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" >{note.details}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}
