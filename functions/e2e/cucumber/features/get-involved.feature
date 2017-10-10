@focus
Feature: Get-Involved

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures
    And I've updated "/profile" with "user-profiles/partial-user-profiles" fixtures
    And I've preloaded all users

  Scenario: Anonymous user can browse projects from the home page
    Given I'm signed out
    And I go to "/"

    Then I should see "Lucidity" in "home-all-projects"
    And I should see "Guest" in "snui-user-header"

    When I click on the first element of "a.project-item"

    Then I should be on "/get-involved/BABP"

    When I click on the first element of ".opp-item a"

    Then I should be on "/get-involved/BABP/opp/BABP1"
    And I should see "Event Crew" in ".opp-head"
  
    When I click on "#dropdownMenuOpportunity"
    And I click on the second element of ".dropdown-menu a"

    Then I should see "Crew Lead" in ".opp-head"
  
  Scenario: Logged in user sees their profile summary in header
    Given I'm signed in as "user-verified-profile@mailinator.com" with password "testtest"
    And I go to "/"

    Then I should see "Testie" in "snui-user-header"