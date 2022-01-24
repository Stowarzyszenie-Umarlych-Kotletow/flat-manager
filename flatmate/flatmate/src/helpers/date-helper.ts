import { format } from "date-fns";

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

export function asDate(dateStr: string) {
  return new Date(Date.parse(dateStr));
}

export function formatDate(dateStr: string) {
  return format(asDate(dateStr), "yyyy-MM-dd");
}

export function withDates(body: any) {
  return handleDates(Object.assign({}, body));
}

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) {
      body[key] = new Date(Date.parse(value));
    }
    else if (typeof value === "object") handleDates(value);
  }
}