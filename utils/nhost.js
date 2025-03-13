import { NhostClient } from "@nhost/nextjs";

const nhostUrl = `https://${process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN}.${process.env.NEXT_PUBLIC_NHOST_REGION}.nhost.run`;

export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
  clientStorageType: 'cookie',
  clientStorage: {
    mode: 'secure',
  },
  authenticationMode: 'password-less',
  clientUrl: typeof window !== 'undefined' ? window.location.origin : '',
  baseURL: nhostUrl,
  debug: true, // Enable debug logging
});