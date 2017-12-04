@focus
Feature: Organize See On Home Page

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
  
  Scenario: Navigate to organize
    Given I go to the home page
    Then I should see "My New Project" in ".organized-projects"
  
    When I click on the first element of ".organized-projects explore-project-card"
    Then I should be on the organize page for the project "My New Project"
