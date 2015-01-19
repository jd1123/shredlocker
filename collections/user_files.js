fileStore = new FS.Store.FileSystem("user_files")

UserFiles = new FS.Collection("user_files", {
  stores: [fileStore]
});
