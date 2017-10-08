Feature: Apply

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures

  Scenario: A new user can apply to a project
    Given I go to "/get-involved/BABP/opp/BABP1"

    Then I should see "Event Crew" in ".opp-head"

    # When I click on the first element of ""

    # And I should see "Lucidity" in "home-all-projects"
    # And I should see "Guest" in "snui-user-header"

    # When I click on the first element of ".project-item"

    # Then I should be on "/get-involved/BABP"
