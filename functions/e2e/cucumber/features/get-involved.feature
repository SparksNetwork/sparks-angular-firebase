@focus
Feature: Get-Involved

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures

  Scenario: I can browse projects from the home page
    Given I go to "/"

    Then I should be on "/"
    And I should see "Lucidity" in "home-all-projects"
    And I should see "Guest" in "snui-user-header"

    When I click on the first element of "a.project-item"

    Then I should be on "/get-involved/BABP"

    When I click on the first element of ".opp-item a"

    Then I should be on "/get-involved/BABP/opp/BABP1"
    And I should see "Event Crew" in ".opp-head"
  
    When I click on "#dropdownMenuOpportunity"
    And I click on the second element of ".dropdown-menu a"

    Then I should see "Crew Lead" in ".opp-head"
  