# shredlocker

## Features

* Secure file upload (if you use SSL, which you should)
* Ability to generate one or more "retrieval URLs"
* Ability to view status of each retrieval URL (consumed or not)
* Secure deletion upon all retrieval URLs for a given file are consumed, each byte is overwritten with `\x00` and the file is unlinked

## Deployment

https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx
