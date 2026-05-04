import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, columnId, order } = await req.json();
    const task = await prisma.task.create({
      data: {
        title,
        columnId,
        order,
      },
    });
    return Response.json(task);
  } catch (error) {
    return Response.json({ error: "Failed to create task" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, columnId, order } = await req.json();
    const task = await prisma.task.update({
      where: { id },
      data: {
        columnId,
        order,
      },
    });
    return Response.json(task);
  } catch (error) {
    return Response.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return Response.json({ error: "ID required" }, { status: 400 });
    
    await prisma.task.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
