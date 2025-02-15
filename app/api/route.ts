import { NextRequest, NextResponse } from "next/server";

import spreadSheet from "@/utils/spreadsheet";
import { GOOGLE_SHEET_NAME_MAP } from "@/constants/sheet";

export async function GET(req: NextRequest) {
  try {
    await spreadSheet.loadInfo();
    const sheets = spreadSheet.sheetsByIndex;
    const sheetData: Record<string, any[]> = {};

    for (const sheet of sheets) {
      const rows = await sheet.getRows();
      const skipSheets = [GOOGLE_SHEET_NAME_MAP[71]];
      if (skipSheets.includes(sheet.title as any)) continue;
      sheetData[sheet.title] = rows.map((row) => row.toObject());
    }

    return NextResponse.json(sheetData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Google Sheets data:", error);
    return NextResponse.json(
      { error: error?.message ?? "Error while fetching the data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const {
      sheetKey,
      data,
    }: { sheetKey: keyof typeof GOOGLE_SHEET_NAME_MAP; data: any[] } = payload;

    if (data.length === 0) {
      console.error("No data provided.");
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 }
      );
    }

    if (!(sheetKey in GOOGLE_SHEET_NAME_MAP)) {
      console.error("Invalid sheetKey:", sheetKey);
      return NextResponse.json(
        { message: "sheetKey you provided is not valid" },
        { status: 400 }
      );
    }

    const sheetName = GOOGLE_SHEET_NAME_MAP[sheetKey];
    console.log("Processing sheet:", sheetName);

    await spreadSheet.loadInfo();
    const sheet = spreadSheet.sheetsByTitle[sheetName];

    if (!sheet) {
      console.error("Sheet not found:", sheetName);
      return NextResponse.json({ message: "Sheet not found" }, { status: 404 });
    }

    await sheet.loadHeaderRow();
    const headerValues = sheet?.headerValues;

    console.log("Clearing the sheet...");
    await sheet.clear();

    if (headerValues && headerValues.length > 0) {
      console.log("Reapplying header row...");
      await sheet.setHeaderRow(headerValues);
    }

    await sheet.addRows(data, { raw: true });

    console.log("Sheet updated successfully.");
    return NextResponse.json(
      { message: "Data added successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error updating sheet:", error);
    return NextResponse.json(
      { error: error?.message ?? "Error while adding the data" },
      { status: 500 }
    );
  }
}
