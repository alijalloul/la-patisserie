Feature: Authentication Flow

  Background:
    Given the user is on the homepage

  Scenario: Check SignUp
    When the user enters "Joe" as first name
    And the user enters "Doe" as last name
    And the user enters "la.patisserie@gmail.com" as email
    And the user enters "12345" as password
    And the user enters "12345" as re-password
    And the user clicks the signup button
    Then the user should see a signup success message
    
  Scenario: Check Fields Validation
    When the user clicks the signup button
    Then the first name error should be displayed
    And the last name error should be displayed
    And the email error should be displayed
    And the password error should be displayed
    And the re-password error should be displayed

  Scenario: Check password mis-match
    When the user enters "Joe" as first name
    And the user enters "Doe" as last name
    And the user enters "la.patisserie@gmail.com" as email
    And the user enters "12345" as password
    And the user enters "54321" as re-password
    And the user clicks the signup button
    Then the re-password mismatch error should be displayed

  Scenario: Check LogIn and LogOut
    When the user switches to the login tab
    And the user enters "la.patisserie@gmail.com" as email
    And the user enters "12345" as password
    And the user clicks the login button
    Then the user should see a login success message
    And the user should have a valid token
    When the user clicks the logout button
    Then the user should see a logout success message

  Scenario: Check LogIn with incorrect credentials
    When the user switches to the login tab
    And the user enters "invalid@example.com" as email
    And the user enters "wrongpassword" as password
    And the user clicks the login button
    Then the user should see an invalid credentials error
