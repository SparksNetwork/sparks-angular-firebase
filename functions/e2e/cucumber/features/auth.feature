@focus
Feature: Basic Auth

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures
    And I've deleted all users

  Scenario: A user can create an account with email and password
    Given I go to "/"
    When I click on "#appbar button"
    Then I should be on the signin page

    When I click on "#appbar button"
    Then I should be on the join page

    When I click on "button.with-email"
    And I fill out these fields and click "#join #with-email button.ok"
      | input[type="text"]      | new-user@putsbox.com  |
      | input[type="password"]  | testtest              |

    Then I should be on "/"
    And I should see "" in "#appbar .profile"

  Scenario: A user with an existing account can login
    # only way to create an account?
    Given I'm signed in as a user with the following information:
      | uid | USER |
      | email | new-user@putsbox.com |
      | password | testtest |
    And I sign out

    When I go to "/"
    And I click on "#appbar button"
    And I fill out these fields and click "#signin #with-email button.ok"
      | input[type="text"]      | new-user@putsbox.com  |
      | input[type="password"]  | testtest              |

    Then I should be on "/"
    And I should see "" in "#appbar .profile"
