import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

export function parseUserAgent(userAgent: string) {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return {
    device: result.device?.model || result.device?.type || "Unknown Device",
    platform: result.os.name || "Unknown OS",
    browser: result.browser.name || "Unknown Browser",
  };
}

export function getGeoLocation(ip?: string) {
  const location = ip ? geoip.lookup(ip) : null;
  return {
    city: location?.city || null,
    country: location?.country || null,
  };
}
