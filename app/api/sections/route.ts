/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import { NextResponse } from "next/server";
import { createSection } from "../../cv/actions";
import { success } from "zod";

export async function POST(request: Request) {
    const formData = await request.formData();
    try {
        const created = await createSection(formData);
        return NextResponse.json({ success: true, data: created });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
}