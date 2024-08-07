db = db.getSiblingDB('dpp_fc_db');

db.createUser({
  user: 'fc_service_user',
  pwd: 'fc_service',
  roles: [
    { role: 'readWrite', db: 'dpp_fc_db' }
  ]
});

//Insert an example user

db.createCollection('users', { 
  validator: { 
    $jsonSchema: { 
      bsonType: 'object', 
      required: ['_id', 'psw'], 
      properties: { 
        _id: { bsonType: 'string' }, 
        psw: { bsonType: 'string' } 
      } 
    } 
  } 
});

db.users.insertOne({
  _id: 'utente1',
  psw: 'utente1'
});


//Insert examples dpps

db.createCollection('dpps', { 
  validator: { 
    $jsonSchema: { 
      bsonType: 'object', 
      required: ['_id', 'public_link', 'private_link'], 
      properties: { 
        _id: { bsonType: 'string' },
        public_link: { bsonType: 'array', items: { bsonType: 'string' } },
        private_link: { bsonType: 'array', items: { bsonType: 'string' } }
      } 
    } 
  } 
});


db.dpps.insertOne({
  _id: '12345678901234',
  public_link: ['http://dpp_service:5051/dpp/public/12345678901234'],
  private_link: ['http://dpp_service:5051/dpp/restricted/12345678901234']
});

db.dpps.insertOne({
  _id: '9876543210',
  public_link: ['http://dpp_service:5051/dpp/public/9876543210'],
  private_link: ['http://dpp_service:5051/dpp/restricted/9876543210']
});