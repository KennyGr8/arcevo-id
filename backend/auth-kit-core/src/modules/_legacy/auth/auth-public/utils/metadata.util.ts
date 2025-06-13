import type { Request } from "express";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

export function extractRequestMetadata(req: Request) {
  const ip = req.ip;
  const userAgent = req.headers["user-agent"] || "unknown";
  const ua = new UAParser(userAgent);
  const parsedUA = ua.getResult();
  const deviceInfo = {
    device: parsedUA.device.model || "unknown",
    platform: parsedUA.os.name || "unknown",
    browser: parsedUA.browser.name || "unknown",
  };
  const geo = geoip.lookup(ip || "");
  const location = geo
    ? `${geo.city || ""}, ${geo.region || ""}, ${geo.country || ""}`.trim()
    : "unknown";

  return { ip, userAgent, deviceInfo, location };
}
