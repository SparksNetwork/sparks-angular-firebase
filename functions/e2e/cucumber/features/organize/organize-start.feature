@focus
Feature: Organize Start

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures
    And I've deleted all users
    
  Scenario: A new user has to join before starting to Organize
    Given I go to "/"

    When I click on "snui-header-full button.primary"
    Then I should be on the join page

    When I click on "button.with-email"
    And I fill out these fields and click "#join #with-email button.ok"
      | input[type="text"]      | new-user@putsbox.com  |
      | input[type="password"]  | testtest              |
    
    Then I should be on "/organize/start"
    And I should see "Start Organizing People" in "snui-header-full"

  Scenario: After entering initial info, see project page with name
    Given I'm signed in as a user with the following information:
      | uid | USER |
      | email | wolverine@putsbox.com |
      | password | testtest |
      | emailVerified | true |
      | legalName | James Howlett |
      | preferredName | Wolverine |
      | phoneNumber | 8053129100 |
      | birthday | 1974-10-25 |
    And I go to "/"

    When I click on "snui-header-full button.primary"
    Then I should be on "/organize/start"
    And I should see "Start Organizing People" in "snui-header-full"

    When I select the radio button "input.benefit-vol"
    And I fill out these fields and click "snui-action-buttons .primary"
      | form input.title | My New Project |

    Then I should be on the organize page for the project "My New Project"
    And I should see "Wolverine" in "organize-nav-page"
