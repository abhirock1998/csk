import { NextRequest, NextResponse } from "next/server";

import { groupRowsByTimeFrame } from "@/utils/date";
import spreadSheet from "@/utils/spreadsheet";
import { parseStockData } from "@/utils/stock";
import { ChartTimeFrame, GOOGLE_SHEET_NAME_MAP } from "@/constants/sheet";

export async function GET(req: NextRequest) {
  try {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const validTimeFrame: ChartTimeFrame[] = ["weekly", "monthly", "daily"];
    const time_frame = (searchParams.get("time_frame") ??
      "monthly") as ChartTimeFrame;

    if (!validTimeFrame.includes(time_frame as ChartTimeFrame)) {
      return NextResponse.json(
        { error: "Invalid time frame" },
        { status: 400 }
      );
    }

    await spreadSheet.loadInfo();
    const sheet = spreadSheet.sheetsByTitle[GOOGLE_SHEET_NAME_MAP[71]];
    if (!sheet) {
      return NextResponse.json({ error: "Sheet not found" }, { status: 404 });
    }

    const rows = await sheet.getRows();

    const parsedRows = rows.map((row) => parseStockData(row.toObject()));

    const analytics = groupRowsByTimeFrame(parsedRows, time_frame);

    return NextResponse.json(analytics, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Google Sheets data:", error);
    return NextResponse.json(
      { error: error?.message ?? "Error while fetching the stock data" },
      { status: 500 }
    );
  }
}
