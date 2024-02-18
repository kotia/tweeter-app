import {FC, memo, useCallback, useState} from "react";
import {Delete} from "@mui/icons-material";
import {Button, Dialog, DialogActions, DialogTitle, IconButton} from "@mui/material";
import {useTweetQuery} from "../../hooks/useTweetQuery.ts";

interface IDeleteTweetProps {
    id: string;
}

const DeleteTweetContainer: FC<IDeleteTweetProps> = ({id}) => {
    const {deleteTweet} = useTweetQuery();
    const [isConfirmOpen, setConfirmOpen] = useState(false);

    const openDialog = useCallback(() => {
        setConfirmOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setConfirmOpen(false);
    }, []);
    
    const handleDelete = useCallback(() => {
        deleteTweet({ id });
    }, [deleteTweet, id]);

    return <>
        <IconButton onClick={openDialog}><Delete /></IconButton>
        <Dialog open={isConfirmOpen} onClose={closeDialog}>
            <DialogTitle>Delete this tweet and all its children?</DialogTitle>
            <DialogActions>
                <Button onClick={handleDelete} variant='outlined'>Delete</Button>
                <Button onClick={closeDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>;
};

export const DeleteTweet = memo(DeleteTweetContainer);