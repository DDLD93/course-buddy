"use client"
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BallotIcon from '@mui/icons-material/Ballot';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { AspectRatio, Box } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import { io } from "socket.io-client";
import StartModal from "./(components)/modal"
import Header from '../../(components)/Header';

function Nodes() {

const socket = io("http://localhost:4000/controller", {
  reconnectionDelayMax: 10000,
});
React.useEffect(() => {
  
  socket.on('connect', () => {
    console.log('Connected to server');})

}, [])

  return (
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={2}
      >
        <NestedCard />
        <NestedCard />
        <NestedCard />
        <NestedCard />
        <NestedCard />
        <NestedCard />
        <NestedCard />


      </Stack>
  )
}

export default Nodes



function NestedCard() {
  return (
    <Card sx={{ borderRadius: 0, width: 200, maxWidth: '100%' }}>
      {/* <CardContent>
        <Typography level="body-xs">IN DESIGN</Typography>
      </CardContent> */}
      <Card
        orientation="horizontal"
        size="sm"
        sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
      >
        <CardOverflow>
          <AspectRatio
            ratio="1"
            sx={{ minWidth: 70, '& img[data-first-child]': { p: 1.5 } }}
          >
            <img src="https://uilogos.co/img/logomark/lighting.png" alt="" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">Sub project</Typography>
          <Typography level="body-sm">Online 17 days</Typography>
        </CardContent>
      </Card>
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          justifyContent: 'space-around',
          py: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography startDecorator={<BallotIcon color="danger" />} level="title-sm">
          13
        </Typography>
        {/* <StartModal/> */}
        <Divider orientation="vertical" />
        <Typography startDecorator={<CommentOutlinedIcon />} level="title-sm">
          9
        </Typography>
        <Divider orientation="vertical" />
        <Typography startDecorator={<InboxOutlinedIcon />} level="title-sm">
          32
        </Typography>
      </CardOverflow>
    </Card>
  );
}





