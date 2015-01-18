# shredlocker

Features:

* Secure file upload (if you use SSL, which you should)
* Ability to generate one or more "retrieval URLs"
* Ability to view status of each retrieval URL (consumed or not)
* Secure deletion upon all retrieval URLs for a given file are consumed, each byte is overwritten with `\x00` and the file is unlinked
