import { get, put } from "@vercel/blob";

export const VENDOR_INTAKE_BLOB_ACCESS = "private" as const;
export const VENDOR_INTAKE_BLOB_PATH = "social-ops/vendor-intake-submissions.json";

export const VENDOR_INTAKE_ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

export const VENDOR_INTAKE_MAX_FILE_SIZE = 10 * 1024 * 1024;

export type VendorIntakeRecord = {
  id: string;
  name: string;
  teamName: string;
  trade: string;
  serviceArea: string;
  contactMethod: string;
  contactValue: string;
  invoiceStatus: string;
  pricingMode: string;
  note: string;
  sourceLabel: string;
  sourceDetail: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  landingPage: string;
  referrer: string;
  attachmentKind: string;
  attachmentPath: string;
  attachmentName: string;
  attachmentType: string;
  attachmentSize: number;
  status: string;
  internalNote: string;
  createdAt: string;
  updatedAt: string;
};

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeNumber(value: unknown) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sanitizeFileName(fileName: string) {
  const normalized = fileName
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || "upload";
}

export function getBlobToken() {
  return (
    import.meta.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    ""
  );
}

export function normalizeVendorIntake(
  input: Record<string, unknown>,
): VendorIntakeRecord {
  const now = new Date().toISOString();
  return {
    id: normalizeText(input.id),
    name: normalizeText(input.name),
    teamName: normalizeText(input.teamName),
    trade: normalizeText(input.trade),
    serviceArea: normalizeText(input.serviceArea),
    contactMethod: normalizeText(input.contactMethod),
    contactValue: normalizeText(input.contactValue),
    invoiceStatus: normalizeText(input.invoiceStatus),
    pricingMode: normalizeText(input.pricingMode),
    note: normalizeText(input.note),
    sourceLabel: normalizeText(input.sourceLabel),
    sourceDetail: normalizeText(input.sourceDetail),
    utmSource: normalizeText(input.utmSource),
    utmMedium: normalizeText(input.utmMedium),
    utmCampaign: normalizeText(input.utmCampaign),
    utmTerm: normalizeText(input.utmTerm),
    utmContent: normalizeText(input.utmContent),
    landingPage: normalizeText(input.landingPage),
    referrer: normalizeText(input.referrer),
    attachmentKind: normalizeText(input.attachmentKind),
    attachmentPath: normalizeText(input.attachmentPath),
    attachmentName: normalizeText(input.attachmentName),
    attachmentType: normalizeText(input.attachmentType),
    attachmentSize: normalizeNumber(input.attachmentSize),
    status: normalizeText(input.status) || "new",
    internalNote: normalizeText(input.internalNote),
    createdAt: normalizeText(input.createdAt) || now,
    updatedAt: normalizeText(input.updatedAt) || now,
  };
}

export async function readVendorIntakes(token: string) {
  try {
    const result = await get(VENDOR_INTAKE_BLOB_PATH, {
      token,
      access: VENDOR_INTAKE_BLOB_ACCESS,
      useCache: false,
    });
    if (!result?.stream) return [];

    const payload = await new Response(result.stream).text();
    const data = JSON.parse(payload);
    if (!Array.isArray(data)) return [];
    return data
      .filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === "object")
      .map((entry) => normalizeVendorIntake(entry));
  } catch (error) {
    const statusCode = typeof error === "object" && error !== null && "status" in error
      ? Number((error as { status?: number }).status)
      : 0;
    if (statusCode === 404) {
      return [];
    }
    throw error;
  }
}

export async function writeVendorIntakes(token: string, items: VendorIntakeRecord[]) {
  await put(VENDOR_INTAKE_BLOB_PATH, JSON.stringify(items, null, 2), {
    token,
    access: VENDOR_INTAKE_BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  });
}

export function validateVendorIntakeFile(file: File) {
  if (!file || file.size <= 0) {
    return "請上傳收費標準或報價單。";
  }

  if (file.size > VENDOR_INTAKE_MAX_FILE_SIZE) {
    return "附件請控制在 10MB 以內。";
  }

  if (!VENDOR_INTAKE_ALLOWED_TYPES.has(file.type)) {
    return "目前僅支援 PDF、JPG、PNG、WEBP、XLS、XLSX。";
  }

  return "";
}

export async function uploadVendorIntakeAttachment(
  token: string,
  submissionId: string,
  file: File,
) {
  const safeName = sanitizeFileName(file.name || "upload");
  const path = `social-ops/vendor-intake-files/${submissionId}-${safeName}`;
  await put(path, file, {
    token,
    access: VENDOR_INTAKE_BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: file.type || "application/octet-stream",
  });
  return path;
}

export async function addVendorIntake(
  token: string,
  input: Record<string, unknown>,
  file: File,
) {
  const id = crypto.randomUUID();
  const attachmentPath = await uploadVendorIntakeAttachment(token, id, file);
  const nextItem = normalizeVendorIntake({
    ...input,
    id,
    attachmentPath,
    attachmentName: file.name,
    attachmentType: file.type,
    attachmentSize: file.size,
    status: "new",
    internalNote: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const existing = await readVendorIntakes(token);
  const nextItems = [nextItem, ...existing];
  await writeVendorIntakes(token, nextItems);
  return {
    item: nextItem,
    items: nextItems,
  };
}

export async function updateVendorIntake(
  token: string,
  input: Record<string, unknown>,
) {
  const id = normalizeText(input.id);
  if (!id) {
    throw new Error("缺少工班登錄 ID。");
  }

  const existing = await readVendorIntakes(token);
  const matched = existing.find((entry) => entry.id === id);
  if (!matched) {
    throw new Error("找不到這筆工班資料。");
  }

  const nextItem = normalizeVendorIntake({
    ...matched,
    ...input,
    updatedAt: new Date().toISOString(),
  });
  const nextItems = [nextItem, ...existing.filter((entry) => entry.id !== id)];
  await writeVendorIntakes(token, nextItems);
  return {
    item: nextItem,
    items: nextItems,
  };
}

export async function getVendorIntakeAttachmentById(token: string, id: string) {
  const items = await readVendorIntakes(token);
  const matched = items.find((entry) => entry.id === id);
  if (!matched?.attachmentPath) return null;
  const blob = await get(matched.attachmentPath, {
    token,
    access: VENDOR_INTAKE_BLOB_ACCESS,
    useCache: false,
  });
  return {
    item: matched,
    blob,
  };
}
