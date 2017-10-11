Feature: Apply

  Background:
    Given I've overwritten "/" with "fully-loaded" fixtures
    And I've deleted all users

  Scenario: A guest user must sign up and complete their profile to start their application
    Given I go to the get-involved page for project "BABP" and opportunity "BABP1"
    When I click on the get-involved join button  
    Then I should be on the signup page

    When I click on "#signin-with-email"
    Then I should be on the signup with email page

    When I submit the email and password form with "new-user@putsbox.com" and "testtest"
    Then I should be on "/auth/email-not-verified"

    # force signout:
    # - ng e2e --serve=true loses auth at this point
    # - ng e2e --serve=false does not
    # make them consistent
    When I wait for 5 seconds
    And I sign out
    And I click on the first link in the "new-user" putsbox inbox
    Then I should be on the signin page

    When I submit the email and password form with "new-user@putsbox.com" and "testtest"
    Then I should be on the application complete profile page for "BABP1"

    When I fill out these fields and click "#next"
      | #legalName | James Howlett |
      | #preferredName | Wolverine |
      | #phoneNumber | 8053129100 |
      | #birthday | 10251974 |
    Then I should be on the application question page for "BABP1"

  Scenario: A new user has to verify their account to start their application
    Given I'm signed in as a user with the following information:
      | uid | USER |
      | email | new-user@putsbox.com |
      | password | testtest |
    And I go to the get-involved page for project "BABP" and opportunity "BABP1"
    When I click on the get-involved join button  
    Then I should be on "/auth/email-not-verified"

  Scenario: A verified user has to complete their profile to start their application
    Given I'm signed in as a user with the following information:
      | uid | USER |
      | email | new-user@putsbox.com |
      | password | testtest |
      | emailVerified | true |
    And I go to the get-involved page for project "BABP" and opportunity "BABP1"
    When I click on the get-involved join button  
    Then I should be on the application complete profile page for "BABP1"

    When I fill out these fields and click "#next"
      | #legalName | James Howlett |
      | #preferredName | Wolverine |
      | #phoneNumber | 8053129100 |
      | #birthday | 10251974 |
    Then I should be on the application question page for "BABP1"

  Scenario: A verified user with a complete profile can apply

    Given I'm signed in as a user with the following information:
      | uid | VERIFIEDUSER |
      | email | verified-user@putsbox.com |
      | password | testtest |
      | emailVerified | true |
      | legalName | James Howlett |
      | preferredName | Wolverine |
      | phoneNumber | 8053129100 |
      | birthday | 1974-10-25 |
    And I go to the get-involved page for project "BABP" and opportunity "BABP1"
    When I click on the get-involved join button
    Then I should be on the application question page for "BABP1"

    When I fill out the fields
      | #answer | This is my answer to the opp question.  |
    And I click on "#next"
    Then I should be on "/apply/BABP1/teams"

    When I click on the first element of "apply-opp-teams-not-selected a"
    Then I should be on "/apply/BABP1/teams/BABP1"

    When I fill out the fields
      | #answer | This is my answer to the team question. |
    And I click on "#next"
    Then I should be on "/apply/BABP1/teams"
    And I should see "Setup and Teardown" in "apply-opp-teams-selected"

    When I click on "#next"
    Then I should be on "/apply/BABP1/review-detail"
    And I should see "James Howlett" in "apply-review-profile"
    And I should see "Wolverine" in "apply-review-profile"

    When I click on "#question-header"
    Then I should see "This is my answer to the opp question." in "#organizer-question"

    When I click on "#app-teams-header"
    Then I should see "Setup and Teardown" in "#selected-teams"

    When I click on "#next"
    Then I should be on "/apply/BABP1/apply-confirmation"
    And I should see "All Done" in "snui-header-simple"

    # And I wait for 30 seconds

  @focus
  Scenario: When applying, a user can add and remove multiple teams
    Given I'm signed in as a user with the following information:
      | uid | USER |
      | email | verified-user@putsbox.com |
      | password | testtest |
      | emailVerified | true |
      | legalName | James Howlett |
      | preferredName | Wolverine |
      | phoneNumber | 8053129100 |
      | birthday | 1974-10-25 |
    And an "application" exists with key "BABPUSER" and the following values:
      | createdOn | 2017-10-10T21:36:36.118Z |
      | oppAnswer | This is my answer |
      | oppKey | BABP1 |
      | oppQuestion | What do you love the most about the Westside? |
      | profileKey | USER |
      | projectKey | BABP |
      | step | Answer |
    And I go to "/apply/BABP1/teams"
    When I click on the "apply-opp-teams-not-selected a" element containing "Setup and Teardown"
    Then I should be on "/apply/BABP1/teams/BABP1"

    When I fill out the fields
      | #answer | This is my answer to the s&t question. |
    And I click on "#next"
    Then I should be on "/apply/BABP1/teams"
    And I should see "Setup and Teardown" in "apply-opp-teams-selected"

    When I click on the "apply-opp-teams-not-selected a" element containing "Wine"
    Then I should be on "/apply/BABP1/teams/BABP2"

    When I fill out the fields
      | #answer | This is my answer to the wine question. |
    And I click on "#next"
    Then I should be on "/apply/BABP1/teams"
    And I should see "Setup and Teardown" in "apply-opp-teams-selected"
    And I should see "Wine Bar" in "apply-opp-teams-selected"

    When I click on the first element of ".selected-team-item a"
    Then I should not see "Setup and Teardown" in "apply-opp-teams-selected"
