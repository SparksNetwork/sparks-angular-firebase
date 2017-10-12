Feature: Join

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures
    And I've deleted all users
    And I'm signed in as a user with the following information:
      | uid | USER |
      | email | wolverine@putsbox.com |
      | password | testtest |
      | emailVerified | true |
      | legalName | James Howlett |
      | preferredName | Wolverine |
      | phoneNumber | 8053129100 |
      | birthday | 1974-10-25 |

  @focus
  Scenario: I can see my profile
    When I go to the home page
    Then I should see "Wolverine" in ".profile-hero h2"

    When I click on ".profile-hero"
    Then I should see "Wolverine" in ".profile-title"
