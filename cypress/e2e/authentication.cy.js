describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("/auth");
  });

  it("Check SignUp", () => {
    const randomEmail = `test.${Math.floor(
      Math.random() * 100000
    )}@example.com`;

    cy.get("input#fn").type("Joe");
    cy.get("input#ln").type("Doe");
    cy.get("input#email").type(randomEmail);
    cy.get("input#password").type("12345");
    cy.get("input#repassword").type("12345");

    cy.intercept("POST", "/api/signup").as("signupRequest");

    cy.get("button#signupButton").click();

    cy.wait("@signupRequest").then((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it("Check Fields Validation", () => {
    cy.get("button#signupButton").click();
    cy.get("input#fn + p").should("have.text", "First name is required");
    cy.get("input#ln + p").should("have.text", "Last name is required");
    cy.get("input#email + p").should("have.text", "Email is required");
    cy.get("input#password + p").should("have.text", "Password is required");
    cy.get("input#repassword + p").should(
      "have.text",
      "Re-password is required"
    );
  });

  it("Check Password Mis-match", () => {
    cy.get("input#fn").type("Joe");
    cy.get("input#ln").type("Doe");
    cy.get("input#email").type(
      `test.${Math.floor(Math.random() * 100000)}@example.com`
    );
    cy.get("input#password").type("12345");
    cy.get("input#repassword").type("54321");
    cy.get("button#signupButton").click();
    cy.get("input#repassword + p").should(
      "have.text",
      "Passwords do not match"
    );
  });

  it("Check LogIn", () => {
    cy.get("button[id*='trigger-login']").click();
    cy.get("input#email").type("la.patisserie@gmail.com");
    cy.get("input#password").type("12345");

    cy.intercept("POST", "/api/login").as("loginRequest");

    cy.get("button#loginButton").click();

    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.getCookie("token").should("exist");
  });

  it("Check LogIn with Incorrect Credentials", () => {
    cy.get("button[id*='trigger-login']").click();
    cy.get("input#email").type("invalid@example.com");
    cy.get("input#password").type("wrongpassword");

    cy.intercept("POST", "/api/login").as("loginRequest");

    cy.get("button#loginButton").click();

    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response.statusCode).to.eq(401); // Adjust based on API behavior
    });
  });
});
