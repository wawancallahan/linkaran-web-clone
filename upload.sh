# yarn && yarn build
rsync -e=ssh -avz build  root@178.128.61.85:/home/server/www/admin_linkaran
# ssh root@178.128.61.85 "cd /home/server/www/admin_linkaran &&  ~/.nvm/versions/node/v12.13.0/bin/npm install  && ~/.nvm/versions/node/v12.13.0/bin/node -r module-alias/register ./node_modules/typeorm/cli.js schema:sync && pm2 start ecosystem.config.js --env dev"
# ssh root@178.128.61.85 "cd /home/server/www/admin_linkaran && pm2 start ecosystem.config.js --env dev"
