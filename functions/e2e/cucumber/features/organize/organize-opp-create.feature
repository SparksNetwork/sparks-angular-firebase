@focus
Feature: Organize Opp Create

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
  
  Scenario: Adding an opp
    Given I go to the organize page for the current project
    Then I should be on the organize page for the project "My New Project"
  
    When I click on ".create-opp"
    Then I should be on the create opp page for the project "My New Project"

    When I fill out these fields and click "snui-action-buttons .primary"
      | form input.title | My New Opp |

    Then I should be on the organize page for the project "My New Project"
    And I should see "My New Opp" in ".opps"