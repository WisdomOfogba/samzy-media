import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SystemSetting } from "@/models/SystemSetting";
import { liveStreamValidationSchema } from "@/lib/validations";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const setting = await SystemSetting.findOne({ type: "global" }).lean();
    if (!setting) {
      return NextResponse.json({
        activeYouTubeVideoId: null,
        isLive: false,
      });
    }
    return NextResponse.json({
      activeYouTubeVideoId: (setting as any).activeYouTubeVideoId || null,
      isLive: Boolean((setting as any).isLive),
    });
  } catch (error) {
    console.error("Failed to fetch live settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch live settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = liveStreamValidationSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();
    const updated = await SystemSetting.findOneAndUpdate(
      { type: "global" },
      {
        activeYouTubeVideoId: validatedData.data.activeYouTubeVideoId,
        isLive: validatedData.data.isLive,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    return NextResponse.json({
      success: true,
      data: {
        activeYouTubeVideoId: (updated as any).activeYouTubeVideoId,
        isLive: (updated as any).isLive,
      },
    });
  } catch (error) {
    console.error("Failed to update live settings:", error);
    return NextResponse.json(
      { error: "Failed to update live settings" },
      { status: 500 }
    );
  }
}

