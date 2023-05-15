import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import axios from 'axios';

export default function EditPostDialog({ data, openModal, setOpenModal, getPostById }) {
    const [caption, setCaption] = useState('');

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleEdit = () => {
        updateCaption()
        setOpenModal(false);
    }

    const updateCaption = async () => {
        try {
            await axios.put(`http://localhost:8000/api/posts/${data.id_post}`, {
                caption: caption,
            });
            getPostById()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Dialog
                fullWidth
                open={openModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Edit a story'}
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth value={caption} onChange={e => setCaption(e.target.value)} label={"Caption"} multiline rows={3} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleEdit} autoFocus>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}