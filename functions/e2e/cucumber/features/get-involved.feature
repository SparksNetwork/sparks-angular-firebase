Feature: Get-Involved

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures
    And I've deleted all users

  Scenario: Anonymous user can browse projects from the home page
    Given I'm signed out
    And I go to the home page

    Then I should see "Bell Arts Block Party" in the home page project list
    And I should see "Guest" in "snui-user-header"

    When I click on the home page project item for "Bell Arts Block Party"

    Then I should be on the get-involved page for "Bell Arts Block Party"

    When I click on the get-involved opportunity item for "Event Crew"

    Then I should be on the get-involved page for "Bell Arts Block Party" looking at the "Event Crew" opportunity

    When I select "Crew Lead" from the opportunity navigation

    Then I should be on the get-involved page for "Bell Arts Block Party" looking at the "Crew Lead" opportunity

  Scenario: Logged in user sees their profile summary in header
    Given I'm signed in as a user with the following information:
      | uid | VERIFIEDUSER |
      | email | verified-user@putsbox.com |
      | password | testtest |
      | emailVerified | true |
      | legalName | James Howlett |
      | preferredName | Wolverine |
      | phoneNumber | 8053129100 |
      | birthday | 1974-10-25 |
    And I go to "/"

    Then I should see "Wolverine" in "snui-user-header"