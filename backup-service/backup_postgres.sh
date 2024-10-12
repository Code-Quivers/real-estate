#!/bin/bash
BACKUP_DIR="/backup"
TIMESTAMP=$(date +\%F-\%T)
FILENAME="backup-$TIMESTAMP.sql"

# Set PostgreSQL password environment variable
export PGPASSWORD="managerrealestate"

# Use -h postgres to connect to the Postgres container over the network
pg_dump -U postgres -h postgres -p 5432 real_estate > $BACKUP_DIR/$FILENAME 2> /backup/backup_error.log

# Check if pg_dump was successful
if [ $? -eq 0 ]; then
    echo "Backup successful: $FILENAME"
else
    echo "Backup failed. Check /backup/backup_error.log for details."
fi