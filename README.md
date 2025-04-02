# ModMail Dashboard

> [!WARNING]  
> This is an (old) work-in-progress Discord modmail project I created while learning Svelte. It is currently not actively maintained or documented, but left as an archive for reference and potential future updates.

## Structure notes

⤵️ = Hook: Called recursively, override events
📩 = Layout: Called recursively, set page data
🙍🏼 = User: Client-side

🔒: Check if user is logged in
🔑: Check if user has access to this resource

🔗: Redirect[url]
↩️: Returns[data]

🍪: Cookie [GET, SET, DELETE]
🗄️: Locals [GET, SET]
📞: API [GET, POST]
📡: Discord API [GET_U] | [GET_B]
💽: Database [GET, SET]
🎁: Page Data [SET]

- /
  🙍🏼?: 📞 POST[/login] => 🔗[Discord OAuth Link] => 🔗[/callback] => 🔗[/dashboard]
  🙍🏼?: 📞 POST[/logout] => 🔗[/]
  ⤵️: 🍪 GET[Access Token, Refresh Token] => 📡 GET_U[User Profile] => 🗄️ SET[User Profile]
  📩: 🗄️ GET[User Profile] => 🎁 SET[User Profile]
  - /api
    - /login
      🍪 SET[OAuth State] => ↩️[Discord OAuth Link]
    - /logout
      🍪 DELETE[Access Token, Refresh Token]
    - /servers
      ⤵️: 🗄️ GET[User Profile] => 🔒
      ⤵️: 🍪 GET[Access Token] => 📡 GET_U[User Servers] => 🗄️ SET[User Servers]
      - /$server/logs `!!TODO!! Hook access check`
        🗄️ GET[User Profile, User Servers] => 🔑
        💽 GET[Logs] => ↩️[Logs]
    - /discord `!!TODO!! Hook access check`
      -/users/$user
        🗄️ GET[User Profile] => 🔒
        📡 GET_B[User] => ↩️[User]
  - /dashboard
    ⤵️: 🗄️ GET[User Profile] => 🔒
    ⤵️: 🍪 GET[Access Token] => 📡 GET_U[User Servers] => 🗄️ SET[User Servers] `!!TODO!! Check permissions using API to stop calling the Discord API twice`
    📩: 🗄️ GET[User Servers] => 🎁 SET[Accessible User Servers]
    - /$server
      📩: 🗄️ GET[User Profile, User Servers] => 🔑 `!!TODO!! This will be changed`
      - /logs
        🙍🏼: 📞 GET[/servers/$server/logs]
        - /$case
          💽 GET[Case] => 🎁 SET[Case]
          🙍🏼: 📞 GET[/discord/users/$user] (for each message)
  - /callback
  🍪 GET[OAuth State] => 🍪 SET[Access Token, Refresh Token] => 🍪 DELETE[OAuth State]

