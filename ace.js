/**
 * Register hook to process TypeScript files using ts-node
 * (only needed in development, not in production build)
 */
if (process.env.NODE_ENV !== 'production') {
  try {
    await import('ts-node-maintained/register/esm')
  } catch {
    // ignore if not installed (e.g. in production)
  }
}

/**
 * Import ace console entrypoint
 */
await import('./bin/console.js')
