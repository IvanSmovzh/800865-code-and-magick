'use strict';

var userDialog = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var WIZARD_NUMBERS = 4;
var simularWizardTemplate = document.querySelector('#similar-wizard-template').content;
var setupSimilarList = document.querySelector('.setup-similar-list');
// function (WIZARD_NUMBERS) {

var characterPlayers = {

  firstName: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  lastName: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  coatColor: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  eyesColor: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]

};

/**
 * возвращает случайное число в диапазоне от до
 * @param {number} min генерирует число ОТ
 * @param {number} max генерирует число ДО
 * @return {number} случайное число в диапазоне от  min до max
 */
var getRandInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * генерирует массив волшебников
 * @param {number} count количество генерируемых волшебников
 * @return {Array} массив волшебников
 */
var generateWizardArray = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push({
      name: characterPlayers.firstName[getRandInteger(0, characterPlayers.firstName.length)] + ' ' + characterPlayers.lastName[getRandInteger(0, characterPlayers.lastName.length)],
      coatColor: characterPlayers.coatColor[getRandInteger(0, characterPlayers.coatColor.length)],
      eyesColor: characterPlayers.eyesColor[getRandInteger(0, characterPlayers.eyesColor.length)]
    });
  }
  return wizards;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  var wizardsArray = generateWizardArray(WIZARD_NUMBERS);
  wizardsArray.forEach(function (value) {
    var template = simularWizardTemplate.cloneNode(true);
    template.querySelector('.setup-similar-label').textContent = value.name;
    template.querySelector('.wizard-coat').style.fill = value.coatColor;
    template.querySelector('.wizard-eyes').style.fill = value.eyesColor;
    fragment.appendChild(template);
  });
  setupSimilarList.appendChild(fragment);
};

var startUp = function () {
  userDialog.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
  renderWizards();
};
startUp();

