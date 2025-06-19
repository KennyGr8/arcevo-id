export interface AdminAuditLogAdapter {
  id: String;
  action: AdminAction;
  actorId?: String;
  actor?: any;
  target?: String;
  meta?: Json;
  createdAt: DateTime;
}
