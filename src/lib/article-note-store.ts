import { get, put } from "@vercel/blob";

export const ARTICLE_NOTES_BLOB_ACCESS = "private" as const;
export const ARTICLE_NOTES_BLOB_PATH = "social-ops/article-notes.json";

export type ArticleNoteRecord = {
  id: string;
  articleSlug: string;
  articleTitle: string;
  articleUrl: string;
  question: string;
  note: string;
  sourceType: string;
  status: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeBoolean(value: unknown) {
  return Boolean(value);
}

function normalizeArticleUrl(articleSlug: string, value: unknown) {
  const normalized = normalizeText(value);
  if (normalized) return normalized;
  return articleSlug ? `/blog/${articleSlug}` : "";
}

export function getBlobToken() {
  return (
    import.meta.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    ""
  );
}

export function normalizeArticleNote(input: Record<string, unknown>): ArticleNoteRecord {
  const now = new Date().toISOString();
  const articleSlug = normalizeText(input.articleSlug);
  return {
    id: normalizeText(input.id),
    articleSlug,
    articleTitle: normalizeText(input.articleTitle),
    articleUrl: normalizeArticleUrl(articleSlug, input.articleUrl),
    question: normalizeText(input.question),
    note: normalizeText(input.note),
    sourceType: normalizeText(input.sourceType) || "self_note",
    status: normalizeText(input.status) || "pending",
    isPinned: normalizeBoolean(input.isPinned),
    createdAt: normalizeText(input.createdAt) || now,
    updatedAt: normalizeText(input.updatedAt) || now,
  };
}

export async function readArticleNotes(token: string) {
  try {
    const result = await get(ARTICLE_NOTES_BLOB_PATH, {
      token,
      access: ARTICLE_NOTES_BLOB_ACCESS,
      useCache: false,
    });
    if (!result?.stream) return [];

    const payload = await new Response(result.stream).text();
    const data = JSON.parse(payload);
    if (!Array.isArray(data)) return [];
    return data
      .filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === "object")
      .map((entry) => normalizeArticleNote(entry));
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

export async function writeArticleNotes(token: string, notes: ArticleNoteRecord[]) {
  await put(ARTICLE_NOTES_BLOB_PATH, JSON.stringify(notes, null, 2), {
    token,
    access: ARTICLE_NOTES_BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  });
}
