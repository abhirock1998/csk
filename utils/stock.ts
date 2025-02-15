export const parseStockData = (row: any): any => {
  const newRow = { ...row };

  if (newRow.Price) {
    newRow.Price = Number(newRow.Price.toString().replace(/[^0-9.]/g, ""));
  }

  if (newRow.Low) {
    // newRow.Low = Number(newRow.Low.toString().replace(/[₹\s]/g, ""));
    newRow.Low = Number(newRow.Low.toString().replace(/[^0-9.]/g, ""));
  }

  if (newRow.High) {
    newRow.High = Number(newRow.High.toString().replace(/[^0-9.]/g, ""));
  }

  return newRow;
};
