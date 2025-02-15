import axios from "axios";
import {
  processAndValidateData,
  getFileExtension,
  ValidProcessData,
} from "@/utils/files";

interface useUploadProps {
  file?: File;
  onError?: (message: string) => void;
  onSuccess?: (data: ValidProcessData, msg?: string) => void;
  mode: "VALIDATE_ONLY" | "VALIDATE_AND_SAVE";
  processData?: any[];
  onSettled?: () => void;
}

const useUploadHook = () => {
  return async ({
    file,
    onError,
    onSuccess,
    mode,
    processData,
    onSettled,
  }: useUploadProps) => {
    try {
      if (!file) return onError?.("File is not valid");

      const allowedTypes = ["xlsx", "xls"];

      if (!allowedTypes.includes(getFileExtension(file.name))) {
        onError?.("Invalid file format. Please upload a valid format file.");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        onError?.("File too large. Maximum allowed size is 5MB.");
        return;
      }

      if (mode === "VALIDATE_ONLY") {
        const { data, warnings } = await processAndValidateData(file);
        if (data.length === 0) {
          onError?.("No valid data found in any sheet.");
          return;
        }
        console.log("Parsed data:", data);
        onSuccess?.({ data, warnings });
        return;
      }

      const parseProcessData = processData ?? [];
      if (parseProcessData.length === 0) return onError?.("No valid data pass");

      const uploadResults = await Promise.allSettled(
        parseProcessData.map(({ data, sheetIndex, tableOrder }) => {
          const sheetKey = `${sheetIndex}${tableOrder}`;
          return axios.post("/api", { data, sheetKey });
        })
      );

      // Process results
      const failedUploads = uploadResults.filter(
        (result) => result.status === "rejected"
      );

      if (failedUploads.length > 0) {
        console.warn(`Some uploads failed:`, failedUploads);
        onError?.(`Some sheets failed to upload. Please check logs.`);
        return;
      }

      onSuccess?.(
        { data: [], warnings: [] },
        `Uploaded files all sheet has been been processed successfully! 🎉`
      );
    } catch (error: any) {
      console.error("Unexpected error during file upload:", error);
      onError?.(error?.message || "An unexpected error occurred.");
    } finally {
      onSettled?.();
    }
  };
};

export default useUploadHook;
