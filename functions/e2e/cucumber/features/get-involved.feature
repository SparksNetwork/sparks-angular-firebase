Feature: Get-Involved

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures
    # And the triggers have had time to update

  Scenario: I can browse projects from the home page
    Given I go to "/"

    Then I should be on "/"
    And I should see "Lucidity" in "home-all-projects"
    And I should see "Guest" in "snui-user-header"

    When I click on the first element of ".project-item"

    Then I should be on "/get-involved/BABP"
    And I should see "Bell Arts Block Party" in ".project-title"
  