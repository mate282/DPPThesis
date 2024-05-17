db = db.getSiblingDB('dpp_fc_db');

db.createUser({
  user: 'fc_service_user',
  pwd: 'fc_service',
  roles: [
    { role: 'readWrite', db: 'dpp_fc_db' }
  ]
});