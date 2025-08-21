// ace.js at project root
const run = async () => {
  const isBuildCmd = process.argv.includes('build')
  if (!isBuildCmd) {
    try {
      await import('ts-node-maintained/register')
    } catch {
      // ignore if not present; in production we don't need it
    }
  }

  const { IgnitorFactory } = await import('@adonisjs/core/factories')
  await new IgnitorFactory()
    .appRoot(process.cwd())
    .createAceKernel()
    .handle(process.argv.slice(2))
}

run()


/**
 * Import ace console entrypoint
 */
await import('./bin/console.js')
