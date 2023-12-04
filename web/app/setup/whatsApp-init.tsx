"use client"
import { Box, Button, Card, CircularProgress, Typography } from "@mui/joy"
import { useEffect, useState } from "react";
import io from "socket.io-client"
import QRCode from "react-qr-code";




export const WhatsAppinit = () => {
    const [loading, setLoading] = useState(false);
    const [qrStr, setQrStr] = useState("");
    const [serverInfo, setServerInfo] = useState(null);
    const socket = io('http://localhost:4000/controller'); // Replace with your server URL


    function startSever(id) {
        socket.emit('startServer', id, (response) => {
            if (response.ok) {
                const wa = io(`http://localhost:4000/${id}`); // Replace with your server URL
                wa.on('connect', () => {
                    console.log("connected whatApp Node::" + id)
                    wa.emit("wa_connect", async (dd) => {
                        console.log("started>>>>" + dd)
                    })
                    wa.on('qr', (code) => {
                        setQrStr(code)
                        console.log({ qrcode: code })
                    })
                })
                // console.log('All data received:', response);
            } else {
                console.error('Error:', response.message);
            }
        });
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to controller server');
            socket.emit("create", {
                name: "umar jere",
                serverId: "12200000",
                phoneNumber: "07055793353"
            }, (response) => {
                if (!response.ok) {
                    alert(response.message);
                    return
                }
                setServerInfo(response.data)


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

        // return () => {
        //     socket.close()
        // }
    }, [])





    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column" >
            {false ? <CircularProgress thickness={1.5} sx={{ '--CircularProgress-size': '200px' }}>
              <Typography>{"message"}</Typography>
            </CircularProgress> :
                <>
                    {!qrStr && <Card size="lg">
                        
                    <QRCode value={qrStr} /></Card>};
                    
                    {serverInfo && serverInfo?.name && <p>{serverInfo.name}</p>}
                    <Button onClick={() => startSever(serverInfo._id)} disabled={serverInfo ? false : true} variant="soft" >Start server</Button>
                </>
            }



        </Box>
    )
}