import { NextRequest, NextResponse } from "next/server";

import { interestFormSheet } from "@/utils/spreadsheet";
import { buySellFormSchema } from "@/schema/buy-sell";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const result = await buySellFormSchema.safeParseAsync(payload);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, quantity, message, intendFor } = result.data;

    await interestFormSheet.loadInfo();

    const sheet = interestFormSheet.sheetsByIndex[0];

    await sheet.addRow(
      {
        Name: name,
        Email: email,
        Phone: phone,
        Quantity: quantity,
        Intent: intendFor || "",
        Message: message || "",
        Timestamp: new Date().toISOString(),
      },
      { raw: true }
    );

    return NextResponse.json(
      { message: "Data added successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding data to Google Sheets:", error);

    return NextResponse.json(
      { error: error?.message ?? "Error while adding the data" },
      { status: 500 }
    );
  }
}
