it('Should open Admin page', () => {
	cy.visit('/');
	cy.get('.page-header__title').should('be.visible');
	cy.get('.page-header__subtitle').should('be.visible');
	cy.get('.login__title').should('be.visible');
});

it('Should successfully login', () => {
	cy.visit('/');
	cy.login('qamid@qamid.ru', 'qamid');
	cy.contains('Управление залами').should('be.visible');
});

const halls = require('../fixtures/testData/halls.json');
const selectors = require('../fixtures/selector/selectors.json');
it('Should add new hall, movie, price and add it to shedule', () => {
	cy.visit('/');
	const prices = require('../fixtures/testData/prices.json');
	const movies = require('../fixtures/testData/movies.json');
	cy.login('qamid@qamid.ru', 'qamid');
	cy.contains('Управление залами').should('be.visible');
	cy.contains('Создать зал').click();
	cy.get(`${selectors.new_hall_name}`).type(`${halls.hall_1}`);
	cy.contains('Добавить зал').click();
	cy.contains(`${selectors.hall_configuration}`, `${halls.hall_1}`).click();
	cy.get(`${selectors.rows}`).clear().type(`${halls.rows_count_1}`);
	cy.get(`${selectors.places}`).clear().type(`${halls.input_places_count_1}`);
	cy.get(`${selectors.hall_configuration_save}`).click();
	cy.get(`${selectors.price_configuration}`, `${halls.hall_1}`).click();
	cy.get(`${selectors.price_std}`).clear().type(`${prices.priceStd_1}`);
	cy.get(`${selectors.price_vip}`).clear().type(`${prices.priceVip_1}`);
	cy.get(`${selectors.price_configuration_save}`).click();

	cy.get(`${selectors.add_movie}`).click();
	cy.get(`${selectors.movie_name}`).type(`${movies.movies_name_1}`);
	cy.get(`${selectors.movie_time}`).type(`${movies.movie_time_1}`);
	cy.get(`${selectors.movie_description}`).type(
		`${movies.movie_description_1}`
	);
	cy.get(`${selectors.movie_country}`).type(`${movies.movie_country_1}`);
	cy.get(`${selectors.poster}`).attachFile('plastic.png');
	cy.get(`${selectors.save_movie}`).click();
});

it('Should pass, open sales', () => {
	cy.visit('/');
	cy.login('qamid@qamid.ru', 'qamid');
	cy.contains('Управление залами').should('be.visible');
	cy.contains(`${selectors.sales_hall}`, `${halls.hall_1}`).click();
	cy.get(`${selectors.open_sales}`).click();
	cy.contains('Продажа билетов открыта!!!').should('be.visible');
});
