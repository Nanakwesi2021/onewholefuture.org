#!/usr/bin/env bash
# Hostinger VPS Deployment Script
# Usage: ./deploy.sh root@YOUR_VPS_IP

if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh root@YOUR_VPS_IP"
    exit 1
fi

SERVER=$1
TARGET_DIR="/var/www/onewholefuture"

echo "Building production bundle..."
npm run build

echo "Creating target directory on VPS ($SERVER)..."
ssh $SERVER "mkdir -p $TARGET_DIR"

echo "Uploading files to Hostinger VPS..."
rsync -avz --delete dist/ $SERVER:$TARGET_DIR/dist/

echo "Deployment complete! Make sure Nginx is configured on your VPS."
