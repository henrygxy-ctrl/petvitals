import "server-only";

export function getNewsletterConfig() {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  if (!apiKey || !Number.isSafeInteger(listId) || listId <= 0 || !Number.isSafeInteger(templateId) || templateId <= 0) return null;
  return { apiKey, listId, templateId };
}
