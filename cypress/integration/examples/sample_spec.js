/* eslint-disable no-undef */
describe("Tests our home inputs", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000/login");
    });
    it("adds texts to inputs", function () {
      cy.get('[data-cy="name"]').type("Tom Harris").should("have.value", "Tom Harris");
      cy.get('[data-cy="email"]')
        .type("darksurfer954@gmail.com")
        .should("have.value", "darksurfer954@gmail.com");
    });
  });
//   describe("checking boxes", function () {
//     beforeEach(function () {
//       cy.visit("http://localhost:3000/pizza-form/");
//     });
//     it("checks topping boxes", function () {
//       cy.get('[type="checkbox"]').check().should("be.checked");
//     });
//   });
//   describe("Tests special instructions text-box", function () {
//     beforeEach(function () {
//       cy.visit("http://localhost:3000/pizza-form/");
//     });
//     it("adds texts to input", function () {
//       cy.get('[data-cy="special-instructions"]')
//         .type("extra cheese please")
//         .should("have.value", "extra cheese please");
//     });
//   });
//   describe("Tests form-submit", function () {
//     beforeEach(function () {
//       cy.visit("http://localhost:3000/pizza-form/");
//       cy.get("#size").select("large").should("have.value", "large");
//       cy.get("#sauce").select("Original").should("have.value", "Original");
//     });
//     it("submits form", function () {
//       cy.get('[data-cy="submit-order-button"]').click();
//     });
//   });
//   describe("Tests tracker", function () {
//     beforeEach(function () {
//       cy.visit("http://localhost:3000/pizza-form/");
//       cy.get("#size").select("large").should("have.value", "large");
//       cy.get("#sauce").select("Original").should("have.value", "Original");
//     });
//     it("track order", function () {
//       cy.get('[data-cy="track-order-button"]').click();
//     });
//   });