Feature: Error Validation


  Scenario: Error message is displayed
    Given i login with "email@mail.com" and "password123"
    Then " Incorrect123 email or password. " error message is displayed


  Scenario Outline: Multiple login attempts
    Given i login with "<username>" and "<password>"
    Then " Incorrect email or password. " error message is displayed
    Examples:
    |username            |password    |
    |email@mail.com      | password123|
    |email@mail.com      | password123|