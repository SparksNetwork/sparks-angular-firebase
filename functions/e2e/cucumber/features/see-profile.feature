Feature: See Profile

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

  Scenario: I can see my profile info on the home page
    When I go to the home page
    Then I should see "Wolverine" in ".profile-hero h2"

    When I click on ".profile-hero"
    Then I should see "Wolverine" in "h2"

  Scenario: I can visit my profile page and see my info
    When I go to "/your-profile"
    Then I should see "James Howlett" in "h2"

  Scenario: I can sign out from my profile page
    When I go to "/your-profile"
    And I click on "#signout"

    Then I should be on "/"
    And I should see "Guest" in ".profile-hero h2"
  