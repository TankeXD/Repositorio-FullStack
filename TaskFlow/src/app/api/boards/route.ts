import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let board = await prisma.board.findFirst({
      include: {
        columns: {
          orderBy: { order: "asc" },
          include: {
            tasks: { orderBy: { order: "asc" } },
          },
        },
      },
    });

    if (!board) {
      board = await prisma.board.create({
        data: {
          name: "Mi Tablero de Trabajo",
          columns: {
            create: [
              { name: "Por Hacer", order: 1 },
              { name: "En Progreso", order: 2 },
              { name: "Completado", order: 3 },
            ],
          },
        },
        include: {
          columns: {
            orderBy: { order: "asc" },
            include: {
              tasks: { orderBy: { order: "asc" } },
            },
          },
        },
      });
    }

    return Response.json(board);
  } catch (error) {
    console.error("Error fetching board:", error);
    return Response.json({ error: "Failed to fetch board" }, { status: 500 });
  }
}
