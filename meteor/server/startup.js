Meteor.startup(function () {
    if(Documents.find().count() == 0) {
        Documents.insert({title:"My First Document"});
    }
});
