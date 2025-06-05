declare module "geoip-lite" {
  export function lookup(ip: string): {
    range: [number, number];
    country: string;
    region: string;
    city: string;
    ll: [number, number];
    metro: number;
    zip: string;
  } | null;
}
