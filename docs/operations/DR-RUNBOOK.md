# Backup and Disaster Recovery Runbook

## Objectives

| Item | Target |
|---|---|
| RTO (logical restore) | < 15 minutes |
| RPO (local profile) | < 24 hours (daily logical dump) |
| RPO (production target) | < 5 minutes with managed PITR/WAL archiving |

The local profile uses PostgreSQL in Docker. Production must use a managed
PostgreSQL service with continuous WAL archiving or an equivalent PITR
mechanism; this runbook validates the logical restore path used for drills and
operator recovery.

## Backup

```powershell
docker exec hani-postgres pg_dump -U hani -d hani -Fc -f /tmp/hani.dump
docker cp hani-postgres:/tmp/hani.dump .\backups\hani-$(Get-Date -Format yyyyMMddHHmm).dump
```

Store dumps in encrypted object storage with lifecycle retention. Never commit
dumps to the repository.

## Restore drill

```powershell
powershell -ExecutionPolicy Bypass -File scripts/dr-drill.ps1
```

The script:

1. dumps the source `hani` database;
2. creates `hani_dr_drill_<timestamp>`;
3. restores the dump;
4. validates module table count, orders, and offers;
5. drops the drill database and dump.

Gate 8 drill result (2026-11-14):

| Metric | Result |
|---|---|
| Restored tables | 107 |
| Restored orders | 6 |
| Restored offers | 7 |
| Logical restore RTO | 2.1 s |
| RPO | last successful `pg_dump` |

## Production restore

1. Open an incident and freeze writes.
2. Provision a new database from the latest PITR point or dump.
3. Run the seven module migrations if the dump predates a migration.
4. Point the API at the restored database through the secret manager.
5. Run `/health/ready`, the SLO smoke test, and a booking read check.
6. Re-enable writes and record the actual RTO/RPO in the incident.

## Data safety rules

- Never run destructive SQL against production without a verified restore.
- Keep schema-per-module migrations independent; restore all seven schemas.
- Verify the outbox/inbox tables are present after restore.
- Rotate PSP and channel webhook secrets after a suspected data exposure.

## Scripted backup and restore

Use the scripts so every dump has a checksum and every restore is validated:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/backup-db.ps1
powershell -ExecutionPolicy Bypass -File scripts/restore-db.ps1 `
  -BackupFile .\backups\hani-YYYYMMDDHHMMSS.dump
```

`restore-db.ps1` restores into a new `hani_restore_<timestamp>` database by
default. Restoring over `hani` requires `-AllowProductionDatabase` and an
incident record. The script validates that application tables were restored and
prints the table count.

## Production readiness

See `docs/operations/PRODUCTION-CHECKLIST.md`. A Production host refuses to start
when development secrets, Mock payments, Memory cache, InMemory messaging, or a
wildcard `AllowedHosts` are still configured.

## Support attachment storage

Ticket and dispute attachments are stored privately under
`Support:Attachments:RootPath` (default `support-attachments`). The database
stores metadata only. Back up this directory with the database backup and
restore both together; a database-only restore leaves attachment links broken.
Never serve this directory through static files or a public CDN.
