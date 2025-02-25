'use client';
import React, { useState } from 'react';
import { runAi } from './googleGenAI';
import Modal from '../components/modal';
import { Button, TextField, CircularProgress } from '@mui/material';


export default function Home() {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);

    const handleClick = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const data = await runAi(query);
            setResponse(data);
            handleModalOpen();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mt-12 ml-9'>
            <form onSubmit={handleClick}>
                <div className='mb-3'>
                    <TextField
                        fullWidth
                        label='Enter a prompt'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <Button
                    type='submit'
                    variant='contained'
                    sx={{
                        backgroundColor: 'black',
                        color: 'white'
                    }}
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    {loading ? 'Generating...' : 'Generate with Google Generative AI'}
                </Button>
            </form>

            <Modal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                response={response}
                loading={loading}
            />
        </div>
    );
}
