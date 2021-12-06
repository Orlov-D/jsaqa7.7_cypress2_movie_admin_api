const selectors = require('../fixtures/selector/selectors.json');

it('Should booking ticket', () => {
	cy.visit('http://qamid.tmweb.ru/client/index.php');
	cy.get(`${selectors.day}`).click();
	cy.get(`${selectors.time}`).click();
	cy.get(`${selectors.chair}`).click();
	cy.get(`${selectors.button}`).click();
	cy.contains(
		'После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.'
	).should('be.visible');
	cy.get(`${selectors.button}`).click();
	cy.contains(
		'Покажите QR-код нашему контроллеру для подтверждения бронирования.'
	).should('be.visible');
});
