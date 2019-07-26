# Apollo Issue

Mutation does not cause components to requery / rerender.

_To recreate:_

- Run `npm start`
- Navigate to `http://localhost:8080/`
- Click the `Mutate` button
- Notice that the ui only changes for the second component as its `name` property is now complete
- Refresh the page and notice the update applies to both now

# Question

The solution is to query for all the fields, but there is no good way to do this. Any suggestions on how to requery / rerender all components dependent on `user.name` without updating the fields in mutate (a solution which is brittle). The real issue lies in `name` going from null to a partially complete object and Apollo refusing to work with such objects.
