# NodeJS & AngularJS Boilerplate

## This is still working in progress. :)

## Installation notes

Run: ./install.sh

OR do it manually:

1. Server:

           1.1. npm install

           1.2. Create json file for your own environment exp:

           ./server/env/dev.json
           
           1.3 Create a mysql database based on the params from step 1.2

2. Client:

            2.1. Install:
                  1. npm install
                  2. bower install

            2.2 Run:
                  1. For build the project:
                  $ gulp build-*ENV*
                  2. Serving the dist environment
                  $ gulp serve-dist

                  2. Build and watch for sass changes (for working locally):
                  $ gulp serve


## Configure Mail API for using Gmail. 

* https://www.google.com/settings/security/lesssecureapps

### OR create API keys with google apps:

* http://masashi-k.blogspot.fr/2013/06/sending-mail-with-gmail-using-xoauth2.html
* https://github.com/andris9/nodemailer-smtp-transport#authentication