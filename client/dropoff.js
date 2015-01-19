Session.set('busy-uploading', false);

Template.dropoff.helpers({
  'busy': function() {
    return Session.get('busy-uploading');
  }
});


Template.dropoff.events({
  'change input[type=file]': function(event, template) {
    var busy = Session.get('busy-uploading');
    if (busy) return false;
    Session.set('busy', true);
    FS.Utility.eachFile(event, function(file) {
      UserFiles.insert(file, function (err, fileObj) {
        if (err) throw err;
        Packages.insert({ fileId: fileObj._id }, function(err, pkg_id) {
          if (err) throw err;
          Session.set('busy', false);
          Router.go('/p/'+pkg_id);
        })
      });
    })
  }
});
