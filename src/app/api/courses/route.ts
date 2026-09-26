import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'courses.json');

export async function GET() {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: Request) {
  const newCourse = await req.json();
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  data.push(newCourse);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true, course: newCourse });
}

export async function PUT(req: Request) {
  const updatedCourse = await req.json();
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  const index = data.findIndex((c: { id: string }) => c.id === updatedCourse.id);
  if (index !== -1) {
    data[index] = updatedCourse;
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true, course: updatedCourse });
  }
  return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  const filtered = data.filter((c: { id: string }) => c.id !== id);
  fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}
