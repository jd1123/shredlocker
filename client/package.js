Template.pkg.helpers({
  'retrievalURL': function() {
    return window.location.href+'/c/'+this.code;
  }
});


Template.pkg.events({
  'click .secure-wipe': function() {
    alert('not implemented')
  },
  'click .generate': function(event, template) {
    var codes = this.pkg.retrievalCodes || [];
    codes.push({
      code: Math.random().toString(36).substring(2),
      consumed: false,
      createdAt: new Date()
    });
    Packages.update({_id: this.pkg._id}, {
      $set: { retrievalCodes: codes }
    });
  },
  'click .revoke': function(event, template) {
    var revokedCode = this.code;
    var codes = template.data.pkg.retrievalCodes || [];
    var updatedCodes = _(codes).reject(function(c) {
      return c.code === revokedCode
    })
    Packages.update({ _id: template.data.pkg._id }, {
      $set: { retrievalCodes: updatedCodes }
    });
  }
});
