import type { APIRoute } from "astro";

import { buildRequirementSubmissionSummary } from "../../../lib/requirement-form-summary";

const requirementFormId =
  import.meta.env.FORMSPREE_REQUIREMENT_FORM_ID?.trim() ||
  import.meta.env.PUBLIC_FORMSPREE_REQUIREMENT_FORM_ID?.trim() ||
  "";

export const POST: APIRoute = async ({ request, redirect }) => {
  const fallbackRedirect = "/requirement-form?submit_error=1";

  if (!requirementFormId) {
    return redirect(fallbackRedirect, 303);
  }

  const incomingFormData = await request.formData();
  const { subject, replyTo, fields } = buildRequirementSubmissionSummary(incomingFormData);

  const forwardFormData = new FormData();
  forwardFormData.set("_subject", subject);

  if (replyTo) {
    forwardFormData.set("_replyto", replyTo);
  }

  fields.forEach(({ label, value }) => {
    forwardFormData.set(label, value);
  });

  try {
    const response = await fetch(`https://formspree.io/f/${requirementFormId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: forwardFormData,
    });

    if (!response.ok) {
      console.error("Requirement form forwarding failed.", {
        status: response.status,
        statusText: response.statusText,
      });
      return redirect(fallbackRedirect, 303);
    }
  } catch (error) {
    console.error("Requirement form forwarding threw an error.", error);
    return redirect(fallbackRedirect, 303);
  }

  return redirect("/consultation-thank-you", 303);
};
