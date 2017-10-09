@focus
Feature: Apply

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures
    And I've preloaded all users

  Scenario: A guest user can apply to a project
    Given I go to "/get-involved/BABP/opp/BABP1"

    Then I should see "Event Crew" in ".opp-head"

    When I click on "project-actionbar-opp-join a.btn"

    Then I should be on "/auth/%2Fapply%2FBABP1%2Fanswer-question/signup"

    When I click on "#signin-with-email"

    Then I should be on "/auth/%2Fapply%2FBABP1%2Fanswer-question/email-signup"

    When I fill out the fields
      | Locator   | input                 |
      | #email    | new-user@putsbox.com  |
      | #password | testtest              |
    And I click on "#signin"

    Then I should be on "/auth/email-not-verified"

    When I wait for 4 seconds
    # force signout:
    # - ng e2e --serve=true loses auth at this point
    # - ng e2e --serve=false does not
    # make them consistent
    And I sign out
    And I go to "http://preview.putsbox.com/p/new-user/last"
    And I click on the first element of "a"

    Then I should be on "/auth/%2Fapply%2FBABP1%2Fanswer-question/signin"

    When I fill out the fields
      | Locator   | Input                 |
      | #email    | new-user@putsbox.com  |
      | #password | testtest              |
    And I click on "#signin"

    Then I should be on "/apply/BABP1/complete-profile"

    When I fill out the fields
      | Locator         | Input                 |
      | #legalName      | Stephen DeBaun        |
      | #preferredName  | Stevo                 |
      | #phoneNumber    | 8053129100            |
      | #birthday       | 10/25/1974            |
    And I click on "#next"

    Then I should be on "/apply/BABP1/answer-question"

    When I fill out the fields
      | Locator | Input                                   |
      | #answer | This is my answer to the opp question.  |
    And I click on "#next"

    Then I should be on "/apply/BABP1/teams"

    When I click on the first element of "apply-opp-teams-not-selected a"

    Then I should be on "/apply/BABP1/teams/BABP1"

    When I fill out the fields
      | Locator | Input                                   |
      | #answer | This is my answer to the team question. |
    # probably problems with firebase-observables
    And I wait for 20 seconds
    And I click on "#next"

    Then I should be on "/apply/BABP1/teams"
    And I wait for 20 seconds
    And I should see "Setup and Teardown" in "apply-opp-teams-selected"

    When I click on "#next"

    Then I should be on "/apply/BABP1/review-detail"

    And I wait for 10 seconds

    # And I should see "Lucidity" in "home-all-projects"
    # And I should see "Guest" in "snui-user-header"

    # When I click on the first element of ".project-item"

    # Then I should be on "/get-involved/BABP"
