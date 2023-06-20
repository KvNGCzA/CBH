# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proofread your work.

## Your Breakdown Here
**LEGEND: BE - Backend, FE - Frontend**

1. **BE Ticket 1**: Create a new table named FacilitiesAgent Table
   - **Acceptance criteria:**
      1. Add 3 columns facility_id, agent_id and custom_id
         1. The facility_id joins the row to the Facilities table
         2. The agent_id joins the row the Agent table
         3. And the custom_id is the
      2. Use the facility_id & agent_id as secondary indexes to easily find a combination of these values
2. BE Ticket 2: Create an endpoint to allow facilities to add custom_ids
    - **Acceptance criteria:**
      1. When Adding a new custom_id, the combination of the facility_id & agent_id is unique, therefore we cannot have two rows with identical facility_id & agent_id - Ensure this constraint
      2. This endpoint must not perform updates at the moment
3. Product Team ticket: 
   - **Acceptance criteria:**
      1. Create designs and flows for the UI allowing Facilities to add custom ID's
      2. Decide if Facilities can update this id (Won't recommend)
      3. Decide rollout strategy (How many companies get this feature and pricing limitations e.t.c)
4. FE Ticket 1: Build component and flow using designs (in the storybook)
    - **Acceptance criteria:**
      - I can view the component in the storybook and it works as expected
5. FE Ticket 2: Establish API connection
    - **Acceptance criteria:**
      - Feature works as expected with APi connection
6. FE &/or BE Ticket 3: Write feature/unit tests
    - **Acceptance criteria:**
      - As much coverage as possible
