import React, { useState, ChangeEvent } from "react";

import useSheetUploader from "@/hooks/useSheetUploader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UploadSelect = () => {
  const [disabledBtn, setDisableBtn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataToSave, setDataToSave] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const uploadFiles = useSheetUploader();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("Something went wrong please try to upload again");
      return;
    }
    setSelectedFile(file);
    event.target.value = "";
    await uploadFiles({
      file,
      mode: "VALIDATE_ONLY",
      onError(message) {
        setError(message);
        setSelectedFile(null);
        setDisableBtn(true);
      },
      onSuccess({ data, warnings }) {
        setDataToSave(data);
        setDisableBtn(false);
        setError(null);
        if (warnings?.length) {
          warnings.forEach((warning: any) => {
            toast.warning(warning, { autoClose: 5000 });
          });
        }
      },
    });
  };

  const handleUploadPress = async () => {
    if (!selectedFile) return;
    setDisableBtn(true);
    await uploadFiles({
      file: selectedFile,
      mode: "VALIDATE_AND_SAVE",
      processData: dataToSave,
      onError(message) {
        setError(message);
      },
      onSuccess(data, message) {
        toast.success(message);
        window.location.reload();
      },
      onSettled() {
        setDataToSave([]);
        setSelectedFile(null);
        setError(null);
      },
    });
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-2">Upload Financial Data</h2>

      <p className="text-secondary_text text-[14px]">
        For downloading the template, click
        <a
          href="/template/Template.xlsx"
          download
          className="text-blue-600 font-medium hover:underline mx-1"
        >
          Here
        </a>
        . This template is pre-formatted and structured to ensure smooth
        processing. It contains the necessary sheets and columns in the expected
        order. Please make sure that you:
      </p>

      <ul className="list-disc pl-5 text-secondary_text text-[14px]">
        <li>Do not modify column names or change their sequence.</li>
        <li>Enter data in the correct format as required.</li>
        <li>Ensure that each sheet has at least one valid entry.</li>
      </ul>

      <p className="text-secondary_text text-[14px] mt-2">
        Once the template is filled, you can upload it back into the system for
        processing and saving into Google Sheets.
      </p>

      {/* File Upload Section */}
      <div className="border-dashed border-2 border-gray-300 p-6 mt-4 text-center rounded-md">
        <label className="block cursor-pointer">
          <input
            accept=".xlsx,.xls,.csv"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-secondary_text font-medium">Select a File</p>
          <p className="text-secondary_text text-sm">
            Supported formats: .xlsx, .xls and file size must not exceed{" "}
            <b>5MB</b>
          </p>
        </label>
      </div>

      {/* Display Selected File */}
      {selectedFile && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-center">
          <p
            title={selectedFile.name}
            className="text-text_color font-medium truncate m-0"
          >
            {selectedFile.name}
          </p>
        </div>
      )}

      {/* Display Error */}
      {error && (
        <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
      )}

      {/* Upload Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleUploadPress}
          className="px-6 py-2 text-white rounded-md shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-blue-400 bg-blue-600 hover:bg-blue-700"
          disabled={disabledBtn}
        >
          Upload File
        </button>
      </div>
    </>
  );
};

export default UploadSelect;
