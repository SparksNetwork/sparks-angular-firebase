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

    When I fill out these fields and click "#join #with-email button"
      | input[type="text"]      | new-user@putsbox.com  |
      | input[type="password"]  | testtest              |

    Then I should be on "/"
    And I should see "profile" in "#appbar"
