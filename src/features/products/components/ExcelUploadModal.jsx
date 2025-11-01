import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import * as XLSX from "xlsx";

export const ExcelUploadModal = ({ isOpen, onClose, onImport }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [parsedData, setParsedData] = useState(null);

  const fileInputRef = useRef(null);
  const cancelRef = useRef(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) handleFileSelect(selectedFile);
  };

  const handleFileSelect = (selectedFile) => {
    if (
      !selectedFile.name.endsWith(".xlsx") &&
      !selectedFile.name.endsWith(".xls")
    ) {
      setError("Please upload only Excel files (.xlsx or .xls)");
      return;
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size too large. Maximum 50MB allowed.");
      return;
    }
    setFile(selectedFile);
    setError("");
    parseExcel(selectedFile);
  };

  const parseExcel = (file) => {
    setIsParsing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          setError("Excel file is empty");
          setIsParsing(false);
          return;
        }

        setTotalRows(jsonData.length);
        setParsedData(jsonData);
        setIsParsing(false);
      } catch (err) {
        setError("Error reading Excel file");
        setIsParsing(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImportClick = async () => {
    if (!parsedData) {
      setError("Please select a file first");
      return;
    }

    setError("");
    setIsProcessing(true);
    setProgress(0);
    setCurrentRow(0);
    cancelRef.current = false;

    const CHUNK_SIZE = 500;
    const allProducts = [];

    try {
      for (let i = 0; i < parsedData.length; i += CHUNK_SIZE) {
        if (cancelRef.current) {
          setError("Import cancelled");
          setIsProcessing(false);
          return;
        }
        const chunk = parsedData.slice(i, i + CHUNK_SIZE);
        const processedChunk = chunk.map((row) => parseRow(row));
        allProducts.push(...processedChunk);
        setCurrentRow(Math.min(i + CHUNK_SIZE, parsedData.length));
        setProgress(
          Math.round(
            (Math.min(i + CHUNK_SIZE, parsedData.length) / parsedData.length) *
              100
          )
        );
        await sleep(50);
      }
      onImport(allProducts);
      setIsProcessing(false);
      handleClose();
    } catch (err) {
      setError("Error during import");
      setIsProcessing(false);
    }
  };

  const parseRow = (row) => {
    const particulars = row.Particulars || row.particulars || "";
    let productId = "";
    let productName = "";
    let unit = "Kg";

    const match = particulars.match(/^([A-Z0-9-]+)\s*\((.+)\)$/);
    if (match) {
      const idPart = match[1];
      productName = match[2].trim();
      const unitMatch = idPart.match(/-([\d]+)([A-Z]+)$/);
      if (unitMatch) {
        unit = unitMatch[2];
        productId = idPart.split("-")[0];
      } else {
        productId = idPart;
      }
    } else {
      productName = particulars;
      productId =
        "PROD-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    const quantity = row.Quantity || row.quantity || "";
    let stock =
      quantity.toLowerCase() === "available"
        ? 1000
        : quantity.toLowerCase().includes("out")
        ? 0
        : parseInt(quantity) || 0;
    const rate = parseFloat(row["Rate (₹)"] || row.Rate || row.rate || 0);

    return {
      id: productId,
      name: productName || "Unknown Product",
      formula: "-",
      stock: stock,
      unit: unit,
      price: Math.round(rate * 100) / 100,
    };
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleCancelImport = () => {
    cancelRef.current = true;
  };

  const handleClose = () => {
    setFile(null);
    setParsedData(null);
    setError("");
    setIsProcessing(false);
    setIsParsing(false);
    setProgress(0);
    setTotalRows(0);
    setCurrentRow(0);
    cancelRef.current = false;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b dark:border-slate-700">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-slate-50">
              Import Excel
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="text-slate-400 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Parsing Loader */}
          {isParsing && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                <div>
                  <p className="font-semibold text-indigo-900 dark:text-indigo-300">
                    Reading file...
                  </p>
                  <p className="text-sm text-indigo-700 dark:text-indigo-400">
                    Analyzing {file?.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Processing */}
          {isProcessing && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                <span className="font-semibold text-blue-900 dark:text-blue-300 text-lg">
                  Importing...
                </span>
              </div>
              <div className="mb-3">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-blue-800 dark:text-blue-400 font-medium">
                  {currentRow.toLocaleString()} / {totalRows.toLocaleString()}{" "}
                  rows
                </span>
                <span className="text-blue-700 dark:text-blue-300 font-bold">
                  {progress}%
                </span>
              </div>
              <button
                onClick={handleCancelImport}
                className="w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          )}

          {/* File Preview */}
          {!isProcessing && !isParsing && file && parsedData && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">
                    File Ready
                  </h3>
                  <div className="space-y-1 text-sm text-green-800 dark:text-green-400">
                    <p>
                      <strong>File:</strong> {file.name}
                    </p>
                    <p>
                      <strong>Rows:</strong> {totalRows.toLocaleString()}{" "}
                      products
                    </p>
                    <p>
                      <strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB
                    </p>
                    {totalRows > 5000 && (
                      <p className="text-yellow-700 dark:text-yellow-400 mt-2">
                        ⚠️ Large file (~10-15 sec)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Area */}
          {!isProcessing && !isParsing && !file && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                  : "border-slate-300 dark:border-slate-600"
              }`}
            >
              <Upload
                className={`h-12 w-12 mx-auto mb-3 ${
                  isDragging ? "text-indigo-600" : "text-slate-400"
                }`}
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {isDragging ? "Drop here..." : "Drag & drop or click to browse"}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                Choose File
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Format Guide */}
          {!isProcessing && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                📋 Format:
              </p>
              <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                <li>
                  • <strong>Particulars:</strong> Product ID & name
                </li>
                <li>
                  • <strong>Quantity:</strong> Stock number
                </li>
                <li>
                  • <strong>Rate (₹):</strong> Price
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isProcessing && (
          <div className="flex justify-end gap-3 p-6 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleImportClick}
              disabled={!file || !parsedData || isParsing}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium flex items-center gap-2"
            >
              {file && parsedData ? (
                <>
                  <Upload className="h-4 w-4" />
                  Confirm ({totalRows.toLocaleString()})
                </>
              ) : (
                "Select File"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
