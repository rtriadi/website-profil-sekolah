import fs from "node:fs";
import path from "node:path";
import { type SchoolDocument } from "@/lib/content/schema";
import { readJsonFile, writeJsonFile } from "@/lib/data/file-storage";

const DATA_FILE = "documents.json";
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "documents");

export function getDocuments(): SchoolDocument[] {
  return readJsonFile<SchoolDocument[]>(DATA_FILE, []);
}

export function getDocumentsByCategory(
  category: string,
): SchoolDocument[] {
  return getDocuments().filter((d) => d.category === category);
}

export async function uploadDocument(
  file: File,
  title: string,
  description: string,
  category: string,
): Promise<{ document?: SchoolDocument; error?: string }> {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (!allowed.includes(file.type)) {
    return { error: "Hanya file PDF, DOC, DOCX, XLS, dan XLSX yang diizinkan" };
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { error: "Ukuran file maksimal 10MB" };
  }

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filename = `${Date.now()}-${sanitizedName}`;
  const filePath = path.join(UPLOAD_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  const id = `doc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const document: SchoolDocument = {
    id,
    title,
    description,
    category: category as SchoolDocument["category"],
    filename,
    url: `/uploads/documents/${filename}`,
    fileSize: file.size,
    uploadedAt: new Date().toISOString(),
  };

  const docs = getDocuments();
  docs.unshift(document);
  writeJsonFile(DATA_FILE, docs);

  return { document };
}

export function deleteDocument(id: string): boolean {
  const docs = getDocuments();
  const doc = docs.find((d) => d.id === id);
  if (!doc) return false;

  const filePath = path.join(UPLOAD_DIR, doc.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  const filtered = docs.filter((d) => d.id !== id);
  writeJsonFile(DATA_FILE, filtered);
  return true;
}
