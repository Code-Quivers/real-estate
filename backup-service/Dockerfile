FROM postgres:latest

# Install cron
RUN apt-get update && apt-get install -y cron

# Create backup directory inside the container
RUN mkdir -p /backup

# Copy the backup script into the container
COPY backup_postgres.sh /usr/local/bin/backup_postgres.sh

# Give execution rights to the script
RUN chmod +x /usr/local/bin/backup_postgres.sh

# Schedule cron job for every 5 minutes
RUN echo "*/5 * * * * /usr/local/bin/backup_postgres.sh >> /var/log/cron.log 2>&1" > /etc/cron.d/backup_cron

# Give execution rights on the cron job file
RUN chmod 0644 /etc/cron.d/backup_cron

# Apply cron job
RUN crontab /etc/cron.d/backup_cron

# Create a log file to observe the cron job
RUN touch /var/log/cron.log

# Run cron in the foreground and tail the cron log
CMD cron && tail -f /var/log/cron.log
