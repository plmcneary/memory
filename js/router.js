memory.router = new Backbone.Router();

memory.router.route('*404', function(badUrl) {
  memory.show('404', {url : badUrl});
});
