(function(ns, w, d, $) {

$(d).ready(function() {
    app.run();
});

var app = {};

app.run = function(){
    app.pages = $('#pages').children();
    app.view = $('#view');
    var index = 0;
    var max   = app.pages.length - 1;
    app.showPage(index);
    $(d).keydown(function(e){
        if (d.activeElement.tagName !== 'BODY') {
            return;
        }
        if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
            return;
        }
        if (e.keyCode === 37) { // left
            index--;
            if (index < 0) {
                index = max;
            }
            app.showPage(index);
        }
        if (e.keyCode === 39) { // right
            index++;
            if (index > max) {
                index = 0;
            }
            app.showPage(index);
        }
    });
}

app.showPage = function(index){
    var li = app.pages.get(index);
    if (!li) {
        return;
    }
    var text = $(li).html()
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/<\/?del>/g, '--')
        .replace(/<\/?ins>/g, '++');
    var html = window.markdown.toHTML(text);
    app.view.html(html);
}

})(this, window, document, jQuery);