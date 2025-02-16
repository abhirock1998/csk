import * as XLSX from "xlsx";
import { parse, isValid } from "date-fns";
import { SHEET_CONFIG, SHEET_REQUIRED_COLUMNS } from "@/constants/sheet";

export const getFileExtension = (filename: string) => {
  return filename.split(".").pop() ?? "";
};

const arraysEqual = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false;

  const set1 = new Set(arr1.map((item) => String(item).toLowerCase().trim()));
  const set2 = new Set(arr2.map((item) => String(item).toLowerCase().trim()));

  return set1.size === set2.size && [...set1].every((val) => set2.has(val));
};

type ProcessedData = {
  sheetName: string;
  data: any[];
  tableOrder: number;
  sheetIndex: string;
};

export interface ValidProcessData {
  data: ProcessedData[];
  warnings: string[];
}

export const processAndValidateData = (file: File) => {
  return new Promise<ValidProcessData>((resolve, reject) => {
    try {
      const reader = new FileReader();
      const warnings: string[] = [];

      reader.onload = async (e) => {
        try {
          const binaryData = e.target?.result;
          if (!binaryData) return reject("Failed to read file data.");

          const workbook = XLSX.read(binaryData, { type: "array" });
          if (!workbook.SheetNames.length) {
            return reject("No sheets found in the uploaded file.");
          }

          console.log("Available sheets:", workbook.SheetNames);

          const extractedData: ProcessedData[] = [];

          for (const sheetName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const opts = { header: 1, raw: false };
            const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, opts);

            const fileHeaders: any[] = jsonData[0] || [];

            for (const key of Object.keys(SHEET_REQUIRED_COLUMNS)) {
              const values = (SHEET_REQUIRED_COLUMNS as any)[key] ?? [];
              for (const value of values) {
                const { pattern, tableOrder } = value;

                if (!fileHeaders || fileHeaders.length !== pattern.length) {
                  const message = `Sheet "${sheetName}" has an incorrect number of columns.\nExpected: ${pattern.length}, Found: ${fileHeaders.length} Skipping....`;
                  continue;
                }

                if (!arraysEqual(fileHeaders, pattern)) {
                  const message = `Sheet "${sheetName}" headers do not match the expected format.\nExpected: ${pattern}\nFound: ${fileHeaders} Skipping....`;
                  continue;
                }

                const rowData = jsonData.slice(1) || [];

                if (rowData.length === 0) {
                  const message = `Sheet "${sheetName}" does not contain any data. Skipping....`;
                  warnings.push(message);
                  continue;
                }

                const isStockSheet =
                  `${SHEET_CONFIG.StockPrice}1` === `${key}${tableOrder}`;

                const dateColumnIndex = fileHeaders.indexOf("Date");

                // Transform array data into object format
                const formattedData = rowData.map((row) => {
                  let obj: any = {};
                  fileHeaders.forEach((header, index) => {
                    const rowValue = row[index] || "";
                    obj[header] = rowValue;

                    // Validate DateColumn when isStockSheet is true
                    if (isStockSheet && index === dateColumnIndex) {
                      const isValid = validateDate(rowValue);
                      if (!isValid) {
                        const rowId = index + 2;
                        const message = `Invalid date found in "${sheetName}" at row ${rowId}: "${rowValue}". Expected format: YYYY-MM-DD. Skipping....`;
                        warnings.push(message);
                      }
                    }
                  });
                  return obj;
                });

                extractedData.push({
                  sheetName,
                  data: formattedData,
                  tableOrder,
                  sheetIndex: key,
                });
              }
            }
          }

          resolve({ data: extractedData, warnings });
        } catch (error) {
          reject(`Error while processing file: ${error}`);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      reject(`Error while uploading file: ${error}`);
    }
  });
};

const validateDate = (date: string) => {
  try {
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    return isValid(parsedDate);
  } catch (error) {
    return false;
  }
};
