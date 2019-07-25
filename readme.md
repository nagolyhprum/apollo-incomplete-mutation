# Apollo Issue

Mutation does not cause components to requery / rerender.

_To recreate:_

- Run `npm start`
- Navigate to `http://localhost:8080/`
- Click the `Mutate` button
- Notice the UI does not change although the network request suggests a change occurred
- Refresh the page and notice the update applies now

_A solution:_

- CONTINUED FROM ABOVE
- Uncomment client.js:31-32
- Click the `Mutate` button
- Notice the UI does change given enough information about the change

# Question

What can I do to make it so that my component will refetch after going from null to a partially filled object? Ideally I am looking for a way that does not involve adding the fields directly (or via Fragments) to the query. Is there a way to only easily get the result I am looking for with little effort?
