/**
 * Created by hustlyl on 16-1-8.
 */
Template.editor.helpers({
        docid: function() {
            var doc = Documents.findOne();
            if(!doc) {
                return undefined;
            }
            else {
                return doc._id;
            }
        },
        config : function() {
            return function(editor){
                editor.setOption("lineNumbers", true);
                editor.setOption("mode", "html");
                editor.on("change", function(cm_editor, info){
                    $("#preview_iframe").contents().find("html").html(cm_editor.getValue());
                });
            }
        },
    }
);