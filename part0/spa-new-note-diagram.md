# New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server -->> browser: 201 Created, "note created"
    deactivate server

    Note right of browser: Browser does not reload and send more requests since the server does not ask for a redirect

    Note right of browser: The JavaScript for handling the submit event has already been requested when the page was loaded the first time

```