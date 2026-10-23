export const manifest = {
  screens: {
    scr_esy2pj: { name: "Sign up", route: "/", state: { "stage": "auth" }, position: { "x": 160, "y": 5780 } },
    scr_nv983b: { name: "Sign in", route: "/", state: { "stage": "auth", "authMode": "signin" }, position: { "x": 1560, "y": 5780 } },
    scr_qq9kni: { name: "Set up your home", route: "/", state: { "stage": "create" }, position: { "x": 160, "y": 7760 } },
    scr_kydc2w: { name: "Starter chores", route: "/", state: { "stage": "create", "createStep": 1 }, position: { "x": 1560, "y": 7760 } },
    scr_8fjezb: { name: "New family – Chores", route: "/", state: { "stage": "app", "household": "new" }, position: { "x": 2960, "y": 7760 } },
    scr_vlfnyg: { name: "Sign up – Invited", route: "/", state: { "stage": "auth", "invited": true }, position: { "x": 2960, "y": 5780 } },
    scr_psj8l7: { name: "Join family", route: "/", state: { "stage": "join", "invited": true }, position: { "x": 160, "y": 9740 } },
    scr_z1k7ss: { name: "Joined – Family", route: "/", state: { "stage": "app", "household": "joined", "tab": "family" }, position: { "x": 1560, "y": 9740 } },
    scr_lvsr0m: { name: "Chores – My list", route: "/", state: { "stage": "app", "tab": "chores" }, position: { "x": 1560, "y": 1820 } },
    scr_uyp04z: { name: "Chores – Everyone", route: "/", state: { "stage": "app", "tab": "chores", "filter": "all" }, position: { "x": 160, "y": 1820 } },
    scr_c4kvi4: { name: "Chores – Done expanded", route: "/", state: { "stage": "app", "tab": "chores", "showDone": true }, position: { "x": 2960, "y": 1820 } },
    scr_tti28l: { name: "Chore details", route: "/", state: { "stage": "app", "tab": "chores", "detailId": "c3" }, position: { "x": 2960, "y": 3800 } },
    scr_a5i6sf: { name: "Assign chore", route: "/", state: { "stage": "app", "tab": "chores", "assignFor": "c1" }, position: { "x": 1560, "y": 3800 } },
    scr_6jg8tn: { name: "New chore", route: "/", state: { "stage": "app", "tab": "chores", "addOpen": true }, position: { "x": 160, "y": 3800 } },
    scr_i9vhp0: { name: "Family", route: "/", state: { "stage": "app", "tab": "family" }, position: { "x": 2960, "y": 9740 } },
    scr_86tvyn: { name: "Your settings", route: "/", state: { "stage": "app", "view": "profile" }, position: { "x": 160, "y": 11720 } },
    scr_icwn7e: { name: "Your settings – Change password", route: "/", state: { "stage": "app", "view": "profile", "passwordOpen": true }, position: { "x": 1560, "y": 11720 } },
    scr_p9oqhs: { name: "Your settings – SSO member", route: "/", state: { "stage": "app", "household": "joined", "view": "profile" }, position: { "x": 2960, "y": 11720 } },
    scr_mpsjb5: { name: "Change picture", route: "/", state: { "stage": "app", "view": "profile", "avatarOpen": true }, position: { "x": 4360, "y": 11720 } },
    scr_f7o4zv: { name: "Manage family", route: "/", state: { "stage": "app", "view": "family-settings" }, position: { "x": 4360, "y": 9740 } },
    scr_5z94gc: { name: "Invite someone", route: "/", state: { "stage": "app", "view": "family-settings", "inviteOpen": true }, position: { "x": 5760, "y": 9740 } },
    scr_ru7cfr: { name: "Member role", route: "/", state: { "stage": "app", "view": "family-settings", "memberId": "emma" }, position: { "x": 7160, "y": 9740 } },
    scr_48l4wz: { name: "Shopping – To buy", route: "/", state: { "stage": "app", "tab": "shopping" }, position: { "x": 160, "y": 13700 } },
    scr_hyk19z: { name: "Shopping – Adding an item", route: "/", state: { "stage": "app", "tab": "shopping", "addDraft": "Ch" }, position: { "x": 4360, "y": 13700 } },
    scr_ljhe6v: { name: "Shopping – One store", route: "/", state: { "stage": "app", "tab": "shopping", "storeFilter": "Albert Heijn" }, position: { "x": 2960, "y": 13700 } },
    scr_jm92dk: { name: "Shopping – All items", route: "/", state: { "stage": "app", "tab": "shopping", "shopView": "all" }, position: { "x": 1560, "y": 13700 } },
    scr_9yig1e: { name: "Shopping – Edit item", route: "/", state: { "stage": "app", "tab": "shopping", "itemId": "s1" }, position: { "x": 5760, "y": 13700 } },
    scr_qfs84m: { name: "Token store", route: "/", state: { "stage": "app", "view": "store" }, position: { "x": 160, "y": 15680 } },
    scr_pe5zdv: { name: "Token store – Get reward", route: "/", state: { "stage": "app", "view": "store", "redeemId": "r1" }, position: { "x": 1560, "y": 15680 } },
    scr_6vhbdw: { name: "Token store – Add reward", route: "/", state: { "stage": "app", "view": "store", "editReward": "new" }, position: { "x": 2960, "y": 15680 } },
    scr_fc6jc4: { name: "Token store – New member", route: "/", state: { "stage": "app", "household": "joined", "view": "store" }, position: { "x": 4360, "y": 15680 } }
  },
  sections: {
    sec_z3xvrt: { name: "Chore views", x: 0, y: 1600, width: 4320, height: 1180 },
    sec_1cyqyz: { name: "Chore management", x: 0, y: 3580, width: 4320, height: 1180 },
    sec_r9zb2d: { name: "Authentication", x: 0, y: 5560, width: 4320, height: 1180 },
    sec_x4y459: { name: "Onboarding setup", x: 0, y: 7540, width: 4320, height: 1180 },
    sec_we9941: { name: "Family management", x: 0, y: 9520, width: 8520, height: 1180 },
    sec_4y7b7c: { name: "User settings", x: 0, y: 11500, width: 5720, height: 1180 },
    sec_cmstuc: { name: "Shopping list", x: 0, y: 13480, width: 7120, height: 1180 },
    sec_6mvwf0: { name: "Token store", x: 0, y: 15460, width: 5720, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_z3xvrt", children: [
    { kind: "screen", id: "scr_uyp04z" },
    { kind: "screen", id: "scr_lvsr0m" },
    { kind: "screen", id: "scr_c4kvi4" }]
  },
  { kind: "section", id: "sec_1cyqyz", children: [
    { kind: "screen", id: "scr_6jg8tn" },
    { kind: "screen", id: "scr_a5i6sf" },
    { kind: "screen", id: "scr_tti28l" }]
  },
  { kind: "section", id: "sec_r9zb2d", children: [
    { kind: "screen", id: "scr_esy2pj" },
    { kind: "screen", id: "scr_nv983b" },
    { kind: "screen", id: "scr_vlfnyg" }]
  },
  { kind: "section", id: "sec_x4y459", children: [
    { kind: "screen", id: "scr_qq9kni" },
    { kind: "screen", id: "scr_kydc2w" },
    { kind: "screen", id: "scr_8fjezb" }]
  },
  { kind: "section", id: "sec_we9941", children: [
    { kind: "screen", id: "scr_psj8l7" },
    { kind: "screen", id: "scr_z1k7ss" },
    { kind: "screen", id: "scr_i9vhp0" },
    { kind: "screen", id: "scr_f7o4zv" },
    { kind: "screen", id: "scr_5z94gc" },
    { kind: "screen", id: "scr_ru7cfr" }]
  },
  { kind: "section", id: "sec_4y7b7c", children: [
    { kind: "screen", id: "scr_86tvyn" },
    { kind: "screen", id: "scr_icwn7e" },
    { kind: "screen", id: "scr_p9oqhs" },
    { kind: "screen", id: "scr_mpsjb5" }]
  },
  { kind: "section", id: "sec_cmstuc", children: [
    { kind: "screen", id: "scr_48l4wz" },
    { kind: "screen", id: "scr_jm92dk" },
    { kind: "screen", id: "scr_ljhe6v" },
    { kind: "screen", id: "scr_hyk19z" },
    { kind: "screen", id: "scr_9yig1e" }]
  },
  { kind: "section", id: "sec_6mvwf0", children: [
    { kind: "screen", id: "scr_qfs84m" },
    { kind: "screen", id: "scr_pe5zdv" },
    { kind: "screen", id: "scr_6vhbdw" },
    { kind: "screen", id: "scr_fc6jc4" }]
  }]

};