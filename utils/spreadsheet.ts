import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const ENV_CONFIG = {
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
  private_key: process.env.GOOGLE_PRIVATE_KEY ?? "",
  sheet_id: process.env.GOOGLE_SHEET_ID ?? "",
  interest_form_sheet_id: process.env.GOOGLE_INTEREST_SHEET_ID ?? "",
};

const serviceAccountAuth = new JWT({
  email: ENV_CONFIG.client_email,
  key: ENV_CONFIG.private_key.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

const doc = new GoogleSpreadsheet(ENV_CONFIG.sheet_id, serviceAccountAuth);
export const interestFormSheet = new GoogleSpreadsheet(
  ENV_CONFIG.interest_form_sheet_id,
  serviceAccountAuth
);
export default doc;
