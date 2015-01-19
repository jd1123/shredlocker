Router.route('/p/:_id', function() {
  var pkg = Packages.findOne({_id: this.params._id});
  this.render('pkg', {
    data: { pkg: pkg }
  });
});
