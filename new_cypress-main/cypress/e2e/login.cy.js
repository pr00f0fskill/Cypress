import * as data from "../helpers/default_data.json"


describe('Проверка авторизации', function () {

	beforeEach('Начало теста', function() {
		cy.visit('/');
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
	});
	afterEach('Конец теста', function() {
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
	});

	it('Верный логин и верный пароль', function () {
		cy.get('#mail').type(data.login); // Верный логин
		cy.get('#pass').type(data.password); // Верный пароль
		cy.get('#loginButton').click(); // Нажал войти
		cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю, что вижу текст
		cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
		cy.wait(3000); // Таймаут на всякий пожарный
	})

	it('Восстановление пароля', function () {
		cy.get('#forgotEmailButton').click(); // Нажал "забыли пароль"
		cy.get('#forgotForm > .header'); // Проверяю текст "Восстановите пароль"
		cy.get('#exitRestoreButton > .exitIcon'); // Проверяю крестик
		cy.get('#mailForgot').type(data.login); // Ввел верный логин
		cy.get('#restoreEmailButton').click(); // Нажал "Отправить код"
		cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяю, что вижу текст
		cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
		cy.wait(3000); // Таймаут на всякий пожарный
	})

	it('Верный логин и НЕверный пароль', function () {
		cy.get('#mail').type(data.login); // Верный логин
		cy.get('#pass').type('jhukjhko'); // НЕверный пароль
		cy.get('#loginButton').click(); // Нажал войти
		cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что вижу текст
		cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
		cy.wait(3000); // Таймаут на всякий пожарный
	})

	it('НЕверный логин и верный пароль', function () {
		cy.get('#mail').type('german@dolnikov1.ru'); // НЕверный логин
		cy.get('#pass').type(data.password); // Верный пароль
		cy.get('#loginButton').click(); // Нажал войти
		cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что вижу текст
		cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
		cy.wait(3000); // Таймаут на всякий пожарный
	})

	it('Логин без @ и верный пароль', function () {
		cy.get('#mail').type('germandolnikov.ru'); // Логин без @
		cy.get('#pass').type(data.password); // Верный пароль
		cy.get('#loginButton').click(); // Нажал войти
		cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяю, что вижу текст
		cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
		cy.wait(3000); // Таймаут на всякий пожарный
	})

	it('GerMan@Dolnikov.ru логин и верный пароль', function () {
		cy.get('#mail').type('GerMan@Dolnikov.ru'); // Логин на приведение к строчным буквам
		cy.get('#pass').type(data.password); // Верный пароль
		cy.get('#loginButton').click(); // Нажал войти
		cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю, что вижу текст
		cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
		cy.wait(3000); // Таймаут на всякий пожарный
	})
})