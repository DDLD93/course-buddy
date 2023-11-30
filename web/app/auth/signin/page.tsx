"use client";

import { signIn } from "next-auth/react";
import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import GoogleIcon from "./GoogleIcon";
import FacebookIcon from "./FacebookIcon";

export default function LoginFinal() {
  return (
    <CssVarsProvider>
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundImage: `url("https://images.unsplash.com/photo-1483791424735-e9ad0209eea2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80")`,
          backgroundSize: 'cover',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)'
        }}
      >
        <Sheet
          sx={{
            placeSelf: "center",
            width: 400,
            height:300,
            py: 5,
            px: 5,
            display: 'flex',
            textAlign: "center",
            flexDirection: 'column',
            gap: 5,
            borderRadius: 'sm',
            boxShadow: 'md',

          }}
          variant="outlined"
        >
          <div>
            <Typography level="h2" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="h4">Sign in to continue.</Typography>
          </div>
          <Button
            variant="soft"
            color="neutral"
            sx={{height:50,fontSize:18}}
            startDecorator={<GoogleIcon />}
            onClick={() => signIn("google")}
          >
            Continue with Google
          </Button>
          <Button
            variant="soft"
            color="neutral"
            sx={{height:50,fontSize:18}}
            startDecorator={<FacebookIcon />}
            onClick={() => signIn("facebook")}

          >
            Continue with Facebook
          </Button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
