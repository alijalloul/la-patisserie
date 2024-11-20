import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Background: Given the user is on the homepage
Given("the user is on the homepage", () => {
  cy.visit("/auth"); // Adjust the path as needed
});

// Scenario: Check SignUp
When("the user enters {string} as first name", (firstName) => {
  cy.get("input#fn").type(firstName);
});

When("the user enters {string} as last name", (lastName) => {
  cy.get("input#ln").type(lastName);
});

When("the user enters {string} as email", (email) => {
  cy.get("input#email").type(email);
});

When("the user enters {string} as password", (password) => {
  cy.get("input#password").type(password);
});

When("the user enters {string} as re-password", (repassword) => {
  cy.get("input#repassword").type(repassword);
});

When("the user clicks the signup button", () => {
  cy.get("button#signupButton").click();
});

Then("the user should see a signup success message", () => {
  cy.intercept("POST", "/api/signup").as("signupRequest"); // Adjust the endpoint as needed
  cy.wait("@signupRequest").then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
  });
});

// Scenario: Check Fields Validation
When("the user clicks the signup button", () => {
  cy.get("button#signupButton").click();
});

Then("the first name error should be displayed", () => {
  cy.get("input#fn + p").should("have.text", "First name is required");
});

Then("the last name error should be displayed", () => {
  cy.get("input#ln + p").should("have.text", "Last name is required");
});

Then("the email error should be displayed", () => {
  cy.get("input#email + p").should("have.text", "Email is required");
});

Then("the password error should be displayed", () => {
  cy.get("input#password + p").should("have.text", "Password is required");
});

Then("the re-password error should be displayed", () => {
  cy.get("input#repassword + p").should("have.text", "Re-password is required");
});

// Scenario: Check password mis-match
When("the user enters {string} as first name", (firstName) => {
  cy.get("input#fn").type(firstName);
});

When("the user enters {string} as last name", (lastName) => {
  cy.get("input#ln").type(lastName);
});

When("the user enters {string} as email", (email) => {
  cy.get("input#email").type(email);
});

When("the user enters {string} as password", (password) => {
  cy.get("input#password").type(password);
});

When("the user enters {string} as re-password", (repassword) => {
  cy.get("input#repassword").type(repassword);
});

Then("the re-password mismatch error should be displayed", () => {
  cy.get("input#repassword + p").should("have.text", "Passwords do not match");
});

// Scenario: Check LogIn and LogOut
When("the user switches to the login tab", () => {
  cy.get("button[id*='trigger-login']").click(); // Adjust if necessary
});

When("the user enters {string} as email", (email) => {
  cy.get("input#email").type(email);
});

When("the user enters {string} as password", (password) => {
  cy.get("input#password").type(password);
});

When("the user clicks the login button", () => {
  cy.get("button#loginButton").click();
});

Then("the user should see a login success message", () => {
  cy.intercept("POST", "/api/login").as("loginRequest"); // Adjust the endpoint as needed
  cy.wait("@loginRequest").then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
  });
});

Then("the user should have a valid token", () => {
  cy.getCookie("token").should("exist");
});

When("the user clicks the logout button", () => {
  cy.get("button#logoutButton").click();
});

// Then("the user should see a logout success message", () => {
//   cy.get('[dataId="logoutsuccess"]').should("exist");
//   cy.get('[dataId="logoutsuccess"]').should(
//     "have.text",
//     "Logged out successfully!"
//   );
// });

// Scenario: Check LogIn with incorrect credentials
When("the user switches to the login tab", () => {
  cy.get("button[id*='trigger-login']").click();
});

When("the user enters {string} as email", (email) => {
  cy.get("input#email").type(email);
});

When("the user enters {string} as password", (password) => {
  cy.get("input#password").type(password);
});

When("the user clicks the login button", () => {
  cy.get("button#loginButton").click();
});

Then("the user should see an invalid credentials error", () => {
  cy.get('[dataId="loginerror"]').should("exist");
  cy.get('[dataId="loginerror"]').should("have.text", "Invalid credentials");
});
