Router.route('/p/:_id/c/:code', function() {
  var pkg = Packages.findOne({_id: this.params._id});
  var code = _(pkg.retrievalCodes).findWhere({ code: this.params.code });
  if (code) {
    if (code.consumed) {
      this.response.writeHead(401, {"Content-Type": "text/plain"});
      this.response.end("401 Not authorized. Ask for a new code.");
    } else {
      pkg.consumeCode(code);
      var file = UserFiles.findOne({ _id: pkg.fileId });
      this.response.writeHead(200, {
        'Content-Type': file.original.type,
        'Content-Disposition': 'attachment; filename=' + file.original.name,
        'Content-Length': file.original.size
      });
      readStream = fileStore.adapter.createReadStreamForFileKey(file.copies.user_files.key);
      readStream.pipe(this.response);
    }
  } else {
    this.response.writeHead(404, {"Content-Type": "text/plain"});
    this.response.end("404 Not found");
  }
}, { where: 'server' });
