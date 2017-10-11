Feature: Review Application

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures
    And I've deleted all users
    And an "application" exists with key "BABPUSER" and the following values:
      | createdOn | 2017-10-11T03:31:57.071Z |
      | oppAnswer | this is my opp answer |
      | oppKey | BABP1 |
      | oppQuestion | What do you love the most about the Westside? |
      | profileKey | USER |
      | projectKey | BABP |
      | status | Pending |
      | step | Team |
      | submittedOn | 2017-10-11T03:32:06.128Z |
    And an "applicationTeam" exists with the following values:
      | createdOn | 2017-10-11T03:31:28.908Z |
      | answer | This is my team answer |
      | appKey | BABPUSER |
      | question | Some question |
      | teamKey | BABP1 |
    And I'm signed in as a user with the following information:
      | uid | VERIFIEDUSER |
      | email | verified-user@putsbox.com |
      | password | testtest |
      | emailVerified | true |
      | legalName | James Howlett |
      | preferredName | Wolverine |
      | phoneNumber | 8053129100 |
      | birthday | 1974-10-25 |

  @focus
  Scenario: After I've applied, I can see that I'm waiting for approval
    When I go to the home page
    Then I should see "Bell Arts Block Party" in "home-all-applications"

    When I click on the "home-all-applications a" element containing "Bell Arts Block Party"
    Then I should see "Bell Arts Block Party" in ".project-title"
    And I should see "Event Crew" in ".opp-title"
    And I should see "Awaiting Approval" in ".status"
