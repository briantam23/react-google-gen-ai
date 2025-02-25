import ReactMarkdown from 'react-markdown';
import { Button, Box, Modal, CircularProgress, Typography } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '85%',
    height: '85%',
    color: 'black',
    bgcolor: 'background.paper',
    border: '3px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    transform: 'translate(-50%, -50%)'
};

type ResponseModalProps = {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    response: string;
    loading: boolean;
}

const ResponseModal = ({ modalOpen, setModalOpen, response, loading }: ResponseModalProps) => {

    const handleModalClose = () => setModalOpen(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(response)
        .then(() => alert('Copied to clipboard!'))
        .catch((e) => console.error('Failed to copy text: ', e));
    };

    return (
        <Modal open={modalOpen} onClose={handleModalClose}>
            <Box sx={style}>
                <Typography variant='h6'>Gen AI Response</Typography>
                <Box sx={{ mt: 2 }}>
                { 
                    loading 
                        ? <CircularProgress />
                        : <ReactMarkdown>{response}</ReactMarkdown>
                }
                </Box>
                <Button
                    onClick={copyToClipboard}
                    variant='contained'
                    color='primary'
                    sx={{ mt: 2, mr: 2 }}
                >
                    Copy to Clipboard
                </Button>
                <Button
                    onClick={handleModalClose}
                    variant='contained'
                    color='secondary'
                    sx={{ mt: 2 }}
                >
                    Close
                </Button>
            </Box>
        </Modal>
    )
}

export default ResponseModal;
