Packages = new Mongo.Collection('packages')

Packages.allow({
  'insert': function(userId, package) {
    return true;
  },
  'remove': function(userId, package) {
    return true;
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
  }
})
