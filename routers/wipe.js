Router.route('/p/:_id/wipe', function() {
  var pkg = Packages.findOne({_id: this.params._id});
  pkg.zeroOut();
  this.response.writeHead(200);
  this.response.end('Zerod');
}, { where: 'server' });
