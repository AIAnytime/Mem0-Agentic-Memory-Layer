import { NextResponse } from "next/server";
import { getMemoryInstance, DEFAULT_USER_ID } from "@/lib/memory";

export async function GET() {
  try {
    const memory = getMemoryInstance();
    const results = await memory.getAll({ userId: DEFAULT_USER_ID });

    return NextResponse.json({
      success: true,
      memories: results.results || [],
      count: results.results?.length || 0,
    });
  } catch (error) {
    console.error("Get memories error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get memories",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { memoryId } = await req.json();
    const memory = getMemoryInstance();
    await memory.delete(memoryId);

    return NextResponse.json({
      success: true,
      message: `Memory ${memoryId} deleted successfully`,
    });
  } catch (error) {
    console.error("Delete memory error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete memory",
      },
      { status: 500 }
    );
  }
}
