# Isomorphic React Authentication

What I learned.

- react
- react-router
- alt

# shared
- use a willTransitionTo helper to abort the auth on failed login
- use @auth decorator for authenticating different container components
- use exenv to check environment

# server
- bootstrap alt state from res.locals and server data
- create new instance and add onAbort handler to redirect on aborted transition
- add alt state with alt.flush to iso
- render the page with iso.render()

# client
- run the router with react-router and bootstrap the state for alt from iso

## Todo

- [ ] Fix webpack config/dev-server
- [ ] Outline first draft