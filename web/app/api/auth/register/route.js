import User from "../../../(models)/User"
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const data = await request.json();

        // find if user exists
        let isUser = await User.find({ email: data.email })
        if (isUser) {
            return new NextResponse(JSON.stringify({ ok: false, message: "email already in record" }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            });
        }
        let newUser = new User(data);
        let user = await newUser.save();

        return new NextResponse(JSON.stringify({ ok: true, data: user }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ ok: true, message: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


