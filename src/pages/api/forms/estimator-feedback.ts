import type { APIRoute } from "astro";

import { buildEstimatorFeedbackSummary } from "../../../lib/estimator-feedback-summary";

const estimatorFeedbackFormId =
  import.meta.env.FORMSPREE_ESTIMATOR_FEEDBACK_FORM_ID?.trim() ||
  import.meta.env.PUBLIC_FORMSPREE_ESTIMATOR_FEEDBACK_FORM_ID?.trim() ||
  import.meta.env.FORMSPREE_REQUIREMENT_FORM_ID?.trim() ||
  import.meta.env.PUBLIC_FORMSPREE_REQUIREMENT_FORM_ID?.trim() ||
  "";

function getRedirectPath(formData: FormData, status: "success" | "error") {
  const rawPath = formData.get("page_path");
  const pagePath =
    typeof rawPath === "string" && rawPath.startsWith("/") ? rawPath : "/tools";
  return `${pagePath}?feedback=${status}#feedback-form`;
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const incomingFormData = await request.formData();

  if (incomingFormData.get("_gotcha")) {
    return redirect(getRedirectPath(incomingFormData, "success"), 303);
  }

  if (!estimatorFeedbackFormId) {
    return redirect(getRedirectPath(incomingFormData, "error"), 303);
  }

  const { subject, replyTo, fields } = buildEstimatorFeedbackSummary(
    incomingFormData,
    {
      userAgent: request.headers.get("user-agent") || "",
      submittedAt: new Date().toISOString(),
    },
  );

  const forwardFormData = new FormData();
  forwardFormData.set("_subject", subject);

  if (replyTo) {
    forwardFormData.set("_replyto", replyTo);
  }

  fields.forEach(({ label, value }) => {
    forwardFormData.set(label, value);
  });

  try {
    const response = await fetch(
      `https://formspree.io/f/${estimatorFeedbackFormId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: forwardFormData,
      },
    );

    if (!response.ok) {
      console.error("Estimator feedback forwarding failed.", {
        status: response.status,
        statusText: response.statusText,
      });
      return redirect(getRedirectPath(incomingFormData, "error"), 303);
    }
  } catch (error) {
    console.error("Estimator feedback forwarding threw an error.", error);
    return redirect(getRedirectPath(incomingFormData, "error"), 303);
  }

  return redirect(getRedirectPath(incomingFormData, "success"), 303);
};
