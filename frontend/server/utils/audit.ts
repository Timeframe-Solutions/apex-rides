import type { H3Event } from 'h3'

export async function writeAuditLog(
  event: H3Event,
  action: string,
  resource: string,
  meta: Record<string, unknown> = {}
) {
  // In a real app, this would write to a DB table
  console.log(`[AUDIT] ${new Date().toISOString()} | Action: ${action} | Resource: ${resource}`, meta)
}
