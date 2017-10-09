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


    # When I log in with ""
    # When I click on the first element of ""

    # And I should see "Lucidity" in "home-all-projects"
    # And I should see "Guest" in "snui-user-header"

    # When I click on the first element of ".project-item"

    # Then I should be on "/get-involved/BABP"
