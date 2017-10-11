Feature: Join

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
    And an "application" exists for the current user with the following values:
      | createdOn | 2017-10-11T03:31:57.071Z |
      | oppAnswer | this is my opp answer |
      | oppKey | BABP1 |
      | oppQuestion | What do you love the most about the Westside? |
      | projectKey | BABP |
      | status | Accepted |
      | step | Team |
      | submittedOn | 2017-10-11T03:32:06.128Z |
    And an "applicationTeam" exists for the current user and project "BABP" with the following values:
      | createdOn | 2017-10-11T03:31:28.908Z |
      | answer | This is my team answer |
      | question | Some question |
      | teamKey | BABP1 |

  @focus
  Scenario: I can join an opportunity where my application has been approved
    When I go to my application page for the project "BABP"
    Then I should see "Bell Arts Block Party" in ".project-title"

    When I click on "#join"
    Then I should be on "/join/BABP1"
