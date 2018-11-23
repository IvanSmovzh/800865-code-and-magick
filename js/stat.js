'use strict';
var CLOUD_WIDTH = 420; // Ширина облака
var CLOUD_HEIGHT = 270; // Высота облака

var CLOUD_FONT = '16px PT Mono';
// Шрифт и размер сообщения в облаке

var HISTOGRAM_X = 130; // Координата смещения X - для гистограмм
var HISTOGRAM_Y = 90; // Координата смещения Y - гистограмм
var HISTOGRAM_TEXT_Y = 260; // Координата смещения Y - для имен (текст) гистограмм
var HISTOGRAM_WIDTH = 40; // Ширина гистограмм
var HISTOGRAM_MAX_HEIGHT = 150; // Максимальная высота гистограмм
var HISTOGRAM_GAP = 50; // Расстояние, пробел между гистограммами
var CLOUD_OFFSET_X = 100;
var CLOUD_OFFSET_PADDING_X = 10;
var CLOUD_OFFSET_PADDING_Y = 10;
var TEXT_PADDING_X = 130;
var TEXT_OFFSET_Y = 40;
var TEXT_OFFSET_PADDING_Y = 20;
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


function getMaxValue(times) {
  var max = times[0];
  for (var i = 0; i < times.length; i++) {
    if (max < times[i]) {
      max = times[i];
    }
  }
  return max;
}
window.renderStatistics = function (ctx, names, times) {
  var proportionValue = getMaxValue(times) / HISTOGRAM_MAX_HEIGHT;
  renderCloud(ctx, CLOUD_OFFSET_X + CLOUD_OFFSET_PADDING_X, CLOUD_OFFSET_PADDING_Y + CLOUD_OFFSET_PADDING_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_OFFSET_X, CLOUD_OFFSET_PADDING_Y, '#fff');
  ctx.fillStyle = 'black';
  ctx.font = CLOUD_FONT;
  ctx.fillText('Ура вы победили!', TEXT_PADDING_X, TEXT_OFFSET_Y);
  ctx.fillText('Список результатов:', TEXT_PADDING_X, TEXT_OFFSET_Y + TEXT_OFFSET_PADDING_Y);

  for (var i = 0; i < names.length; i++) {
    var OFFSET_GAP_X = (HISTOGRAM_GAP + HISTOGRAM_WIDTH) * i + HISTOGRAM_X; // смещение по Х - для имен и времени
    // var OFFSET_GAP_Y = HISTOGRAM_Y + (HISTOGRAM_MAX_HEIGHT - histogramHeight); // то же самое, только по Y
    var histogramHeight = Math.round(times[i] / proportionValue);
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), OFFSET_GAP_X, HISTOGRAM_Y + (HISTOGRAM_MAX_HEIGHT - histogramHeight) - 15);
    ctx.fillText(names[i], OFFSET_GAP_X, HISTOGRAM_TEXT_Y);
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255,0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random().toFixed(3) + ')';
    ctx.fillRect(((HISTOGRAM_WIDTH + HISTOGRAM_GAP) * i) + HISTOGRAM_X, HISTOGRAM_Y + (HISTOGRAM_MAX_HEIGHT - histogramHeight), HISTOGRAM_WIDTH, histogramHeight);
  }
}
