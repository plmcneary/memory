memory.show = function (templateId, model) {
  var templateHtml = $('#' + templateId).html();
  var templateFn = _.template(templateHtml, model);
  var result = templateFn(model);

  $('.game-container').html(result);
};
