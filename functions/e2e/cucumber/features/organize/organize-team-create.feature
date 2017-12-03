@focus
Feature: Organize Team Create

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
    And a "project" exists organized by the current user with the following values:
      | createdOn | 2017-10-11T03:31:57.071Z |
      | title | My New Project |
  
  Scenario: Adding a team
    Given I go to the organize page for the current project
    Then I should be on the organize page for the project "My New Project"
  
    When I click on ".create-team"
    Then I should be on the create team page for the project "My New Project"

    When I select the radio button "input.membership-open"
    And I fill out these fields and click "snui-action-buttons .primary"
      | form input.title | My New Team |

    Then I should be on the create team page for the project "My New Project"
    And I should see "My New Team" in ".teams"