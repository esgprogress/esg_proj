db = db.getSiblingDB("companies_statistics");

db.createUser({
  user: "esg_proj_readonly",
  pwd: "esg_proj_readonly",
  roles: [
    { role: "read", db: "myapp" }
  ]
});
