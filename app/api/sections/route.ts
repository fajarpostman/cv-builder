/**
 * Don't forget to pray before start coding!
 * 
 * @author Fajar Postman
 * 
 */

import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/mongoose";
import Section from '../../../models/Section';
import { success } from "zod";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const formData = await request.formData();

    const userId = formData.get('userId') as string;
    const type = formData.get('type') as string;
    const data = JSON.parse(formData.get('data') as string);

    const section = await Section.create({ userId, type, data });

    return NextResponse.json(section, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/sections error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const sections = await Section.find({}).lean();
    return NextResponse.json(sections);
  } catch (err: any) {
    console.error('GET /api/sections error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await connectToDB();
    const result = await Section.deleteMany({});
    console.log(`Deleted ${result.deletedCount} sections`);

    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount},
      { status: 200 }
    );
  } catch (err: any) {
    console.error("DELETE /api/sections error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}