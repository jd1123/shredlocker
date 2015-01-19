Packages = new Mongo.Collection('packages')

Packages.allow({
  'insert': function(userId, package) {
    return true;
  }
})

Packages.helpers({
  zeroOut: function() {
    var ZeroStream = function(){
      var Stream = Meteor.npmRequire('stream')
      var stream = new Stream();
      return stream;
    }
    var file = UserFiles.findOne({ _id: this.fileId });
    var zeroStream = ZeroStream()
    var writeStream = fileStore.adapter.createWriteStreamForFileKey(file.copies.user_files.key);
    console.log('Zerod '+file.original.name);
    zeroStream.pipe(writeStream);
  },
  consumeCode: function(retCode) {
    var pkg = this;
    retCode.consumed = true;
    retCode.consumedAt = new Date();
    var codes = pkg.retrievalCodes || [];
    var idx = null;
    for (var i=0; i<pkg.retrievalCodes.length; i++) {
      var c = pkg.retrievalCodes[i];
      if (c.code === retCode.code) {
        idx = i;
        break;
      }
    }
    pkg.retrievalCodes[idx] = retCode;
    Packages.update({ _id: pkg._id }, {
      $set: { retrievalCodes: pkg.retrievalCodes }
    }, function(err) {
      if (err) throw err;
      var consumedCodes = 0;
      for (var i=0; i<pkg.retrievalCodes.length; i++) {
        var c = pkg.retrievalCodes[i];
        if (c.consumed) consumedCodes++;
      }
      if (consumedCodes === pkg.retrievalCodes.length) {
        pkg.zeroOut();
      }
    });
  }
})

Packages.attachSchema({
  fileId: {
    type: String,
    minCount: 1,
    optional: false
  },
  retrievalCodes: {
    type: [Object],
    optional: true
  },
  'retrievalCodes.$.code': {
    type: String
  },
  'retrievalCodes.$.consumed': {
    type: Boolean
  },
  'retrievalCodes.$.consumedAt': {
    type: Date,
    optional: true
  },
  'retrievalCodes.$.createdAt': {
    type: Date
  },
  'retrievalCodes.$.consumerIp': {
    type: String,
    optional: true
  }
})
