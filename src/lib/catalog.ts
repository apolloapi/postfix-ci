import raw from "./catalog.json";

export type CatalogImage = {
  name: string; category: string; summary: string; description: string;
  variants: string[]; upstream_url?: string; display_name?: string;
};
export const catalog = raw as { registry: string; org: string; prefix: string; categories: string[]; images: CatalogImage[] };
export const imageRef = (name: string) => `${catalog.registry}/${catalog.org}/${catalog.prefix}${name}`;
export const SPRINT_URL = "https://calendly.com/adrbrown/coffee-chat?month=2026-11";
