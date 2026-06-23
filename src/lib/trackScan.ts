import { supabase } from "./supabase";

export async function trackScan() {
  let ip = "";
  let country = "";
  let city = "";

  try {
    const res = await fetch("https://ipapi.co/json/");
    const geo = await res.json();
    ip = geo.ip ?? "";
    country = geo.country_name ?? "";
    city = geo.city ?? "";
  } catch {
    // fails silently
  }

  const ua = navigator.userAgent;

  const device = /Mobi|Android/i.test(ua) ? "Mobile" : "Desktop";

  const browser = /Edg/i.test(ua)
    ? "Edge"
    : /Chrome/i.test(ua)
      ? "Chrome"
      : /Firefox/i.test(ua)
        ? "Firefox"
        : /Safari/i.test(ua)
          ? "Safari"
          : "Other";

  const os = /Android/i.test(ua)
    ? "Android"
    : /iPhone|iPad|iPod/i.test(ua)
      ? "iOS"
      : /Windows/i.test(ua)
        ? "Windows"
        : /Mac/i.test(ua)
          ? "macOS"
          : /Linux/i.test(ua)
            ? "Linux"
            : "Other";

  try {
    await supabase.from("scans").insert({
      ip,
      country,
      city,
      device,
      browser,
      os,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
    });
  } catch {
    // fails silently
  }
}
