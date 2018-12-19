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
  setupSimilar.classList.remove('hidden');
  renderWizards();
};
startUp();

/**
 * если фокус на имени ввода то окно не закрывается
 */
var setup = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');
var setupOpenIcon = setupOpenButton.querySelector('.setup-open-icon');
var ENTER = 13;
var ESC = 27;
var toggleClassList = function () {
  setup.classList.toggle('hidden');
  document.addEventListener('keydown', onClose);
};

setupCloseButton.addEventListener('click', toggleClassList);
setupCloseButton.setAttribute('tabindex', '0');
setupOpenButton.addEventListener('click', toggleClassList);
setupOpenIcon.setAttribute('tabindex', '0');

var onClose = function (evt) {
  if (evt.keyCode === ESC) {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onClose);
  }
};

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onClose);
});

setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onClose);
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER) {
    toggleClassList();
  }
});


setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER) {
    setup.classList.add('hidden');
  }
});

// ИЗМЕНЕНИЕ ВНЕШНЕГО ВИДА ВОЛШЕБНИКА

var mantieWizardColor = document.querySelector('.wizard-coat');
var eyesWizardColor = document.querySelector('.wizard-eyes');
var fireballWizardColor = document.querySelector('.setup-fireball-wrap');
var colorCoats = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');
var colorEyesWizard = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
var colorFireballWizard = document.querySelector('.setup-fireball-wrap input[name="fireball-color"]');
// Возможные цвета мантии
var colorMantie = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

// Возможные цвета глаз
var colorEyes = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Возможные цвета фаербола
var colorFireball = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];


/**
 * Изменение цвета мантии по клику
 */
// var mantieColor = '';
mantieWizardColor.addEventListener('click', function () {
  var colorCoatWizard = colorMantie[getRandInteger(0, colorMantie.length)];
  document.querySelector('.wizard-coat').style.fill = colorCoatWizard;
  colorCoats.value = colorCoatWizard;
}
);


/**
 * Изменение цвета глаз по клику
 */
eyesWizardColor.addEventListener('click', function () {
  var colorWizardEyes = colorEyes[getRandInteger(0, colorEyes.length)];
  document.querySelector('.wizard-eyes').style.fill = colorWizardEyes;
  colorEyesWizard.value = colorWizardEyes;
});

/**
 * Изменение цвета фаербола по клику
 */
fireballWizardColor.addEventListener('click', function () {
  var colorFireWizard = colorFireball[getRandInteger(0, colorFireball.length)];
  document.querySelector('.setup-fireball-wrap').style.background = colorFireWizard;
  colorFireballWizard.value = colorFireWizard;
});
