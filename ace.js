/**
 * Register hook to process TypeScript files using ts-node
 * (only needed in development, not in production build)
 */
if (process.env.NODE_ENV !== 'production') {
  try {
    await import('ts-node-maintained/register/esm')
  } catch {
    // ignore if not installed
  }
}

/**
 * Import ace console entrypoint
 * - Use TS file in dev
 * - Use compiled JS in production
 */
if (process.env.NODE_ENV === 'production') {
  await import('./build/bin/console.js')
} else {
  await import('./bin/console.js')
}
