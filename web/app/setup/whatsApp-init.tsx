"use client"
import { Box } from "@mui/joy"
import { useEffect, useState } from "react";
import io from "socket.io-client"



export const WhatsAppinit = () => {
    const [loading, setLoading] = useState(false);

    const socket = io('http://localhost:4000/controller'); // Replace with your server URL

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
            socket.emit("create", {}, (response) => {
                if (!response.ok) {
                    alert(response.message);
                }
                let {_id:id} = response.data
                socket.emit('startServer', id, (response) => {
                    if (response.ok) {
                        const wa = io(`http://localhost:4000/${id}`); // Replace with your server URL
                        wa.on('connect', () => {
                            console.log('All data received:   wa');
                            wa.emit("wa_connect", async (dd) => {
                                console.log("started>>>>" + dd)
                            })
                        })
                        console.log('All data received:', response);
                    } else {
                        console.error('Error:', response.message);
                    }
                });
                console.log({ response });
            })
       

        });
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Error handling
        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    }, [])





    return (
        <Box>

        </Box>
    )
}