#!/bin/bash

echo "

 #####  #####   ####  #    # #  ####  #  ####  #    #    #    #  ####  # #    # #    #
 #    # #    # #    # #    # # #      # #    # ##   #    ##   # #    # # ##   #  #  #
 #    # #    # #    # #    # #  ####  # #    # # #  #    # #  # #      # # #  #   ##
 #####  #####  #    # #    # #      # # #    # #  # #    #  # # #  ### # #  # #   ##
 #      #   #  #    #  #  #  # #    # # #    # #   ##    #   ## #    # # #   ##  #  #
 #      #    #  ####    ##   #  ####  #  ####  #    #    #    #  ####  # #    # #    #

"
sudo apt-get update
sudo apt-get -y install nginx


echo "
                          #     #  #####  ### #     # #     #
 ###### #####  # #####    ##    # #     #  #  ##    #  #   #      ####   ####  #    # ######
 #      #    # #   #      # #   # #        #  # #   #   # #      #    # #    # ##   # #
 #####  #    # #   #      #  #  # #  ####  #  #  #  #    #       #      #    # # #  # #####
 #      #    # #   #      #   # # #     #  #  #   # #   # #      #      #    # #  # # #
 #      #    # #   #      #    ## #     #  #  #    ##  #   #     #    # #    # #   ## #
 ###### #####  #   #      #     #  #####  ### #     # #     #     ####   ####  #    # #

"

sudo rm /etc/nginx/sites-available/default
sudo touch /etc/nginx/sites-available/default

sudo cat >> /etc/nginx/sites-available/default <<'EOF'
# You may add here your
# server {
#       ...
# }
# statements for each of your virtual hosts to this file

##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# http://wiki.nginx.org/Pitfalls
# http://wiki.nginx.org/QuickStart
# http://wiki.nginx.org/Configuration
#
# Generally, you will want to move this file somewhere, and start with a clean
# file but keep this around for reference. Or just disable in sites-enabled.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

server {
        listen 80;
        listen [::]:80 default_server ipv6only=on;
        server_name www.emailcomposer.dev;

        location / {
                proxy_pass http://127.0.0.1:4500;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

}

# another virtual host using mix of IP-, name-, and port-based configuration
#
#server {
#       listen 8000;
#       listen somename:8080;
#       server_name somename alias another.alias;
#       root html;
#       index index.html index.htm;
#
#       location / {
#               try_files $uri $uri/ /index.html;
#       }
#}


# HTTPS server
#
#server {
#       listen 443;
#       server_name localhost;
#
#       root html;
#       index index.html index.htm;
#
#       ssl on;
#       ssl_certificate cert.pem;
#       ssl_certificate_key cert.key;
#
#       ssl_session_timeout 5m;
#
#       ssl_protocols SSLv3 TLSv1;
#       ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv3:+EXP;
#       ssl_prefer_server_ciphers on;
#
#       location / {
#               try_files $uri $uri/ /index.html;
#       }
#}
EOF


echo "

### #     #  #####  #######    #    #       #           #####  ### #######
 #  ##    # #     #    #      # #   #       #          #     #  #     #
 #  # #   # #          #     #   #  #       #          #        #     #
 #  #  #  #  #####     #    #     # #       #          #  ####  #     #
 #  #   # #       #    #    ####### #       #          #     #  #     #
 #  #    ## #     #    #    #     # #       #          #     #  #     #
### #     #  #####     #    #     # ####### #######     #####  ###    #

"
sudo apt-get -y install git

echo "


### #     #  #####  #######    #    #       #          #     # ####### ######  #######
 #  ##    # #     #    #      # #   #       #          ##    # #     # #     # #
 #  # #   # #          #     #   #  #       #          # #   # #     # #     # #
 #  #  #  #  #####     #    #     # #       #          #  #  # #     # #     # #####
 #  #   # #       #    #    ####### #       #          #   # # #     # #     # #
 #  #    ## #     #    #    #     # #       #          #    ## #     # #     # #
### #     #  #####     #    #     # ####### #######    #     # ####### ######  #######
"
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

echo "


### #     #  #####  #######    #    #       #          ######  #     #    #    ####### ####### #     #    #     #####           #  #####
 #  ##    # #     #    #      # #   #       #          #     # #     #   # #      #    #     # ##   ##   # #   #     #          # #     #
 #  # #   # #          #     #   #  #       #          #     # #     #  #   #     #    #     # # # # #  #   #  #                # #
 #  #  #  #  #####     #    #     # #       #          ######  ####### #     #    #    #     # #  #  # #     #  #####           #  #####
 #  #   # #       #    #    ####### #       #          #       #     # #######    #    #     # #     # #######       #    #     #       #
 #  #    ## #     #    #    #     # #       #          #       #     # #     #    #    #     # #     # #     # #     #    #     # #     #
### #     #  #####     #    #     # ####### #######    #       #     # #     #    #    ####### #     # #     #  #####      #####   #####

"

sudo apt-get -y install g++ flex bison gperf ruby perl libsqlite3-dev libfontconfig1-dev libicu-dev libfreetype6 libssl-dev libpng-dev libjpeg-dev python libx11-dev libxext-dev ttf-mscorefonts-installer
echo "
===========================
     PHANTOM DOWNLOAD
===========================
 "
cd ~
export PHANTOM_JS="phantomjs-1.9.8-linux-x86_64"
wget https://bitbucket.org/ariya/phantomjs/downloads/$PHANTOM_JS.tar.bz2
sudo tar xvjf $PHANTOM_JS.tar.bz2
sudo mv $PHANTOM_JS /usr/local/share
sudo ln -sf /usr/local/share/$PHANTOM_JS/bin/phantomjs /usr/local/bin
echo "
===========================
     PHANTOM Test
===========================
 "
phantomjs --version

echo "


### #     #  #####  #######    #    #       #                                             ######  ######
 #  ##    # #     #    #      # #   #       #          #    #  ####  #    #  ####   ####  #     # #     #
 #  # #   # #          #     #   #  #       #          ##  ## #    # ##   # #    # #    # #     # #     #
 #  #  #  #  #####     #    #     # #       #          # ## # #    # # #  # #      #    # #     # ######
 #  #   # #       #    #    ####### #       #          #    # #    # #  # # #  ### #    # #     # #     #
 #  #    ## #     #    #    #     # #       #          #    # #    # #   ## #    # #    # #     # #     #
### #     #  #####     #    #     # ####### #######    #    #  ####  #    #  ####   ####  ######  ######

"


sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org


echo "
                                                    #####
 #####  ######  ####  #####   ##   #####  #####    #     # ###### #####  #    # #  ####  ######  ####
 #    # #      #        #    #  #  #    #   #      #       #      #    # #    # # #    # #      #
 #    # #####   ####    #   #    # #    #   #       #####  #####  #    # #    # # #      #####   ####
 #####  #           #   #   ###### #####    #            # #      #####  #    # # #      #           #
 #   #  #      #    #   #   #    # #   #    #      #     # #      #   #   #  #  # #    # #      #    #
 #    # ######  ####    #   #    # #    #   #       #####  ###### #    #   ##   #  ####  ######  ####

"

sudo service nginx restart
node -v
sudo service mongod restart

echo "

     .-.
     | |
     | |   .-.
     | |-._| |
     |_| | | |
    / )|_|_|-|
   | |  -^-^ |
   |     ||  |
    \    '   /
     |      |
     |      |


"
