This repositori contains all the services necessary to implement the Digital Product Passport infrastructure.

FC_Service => Federated central service used to register all the dpp documents
              Running on port 5052
              User credentials to register doc:
              {
                  "name":"utente1",
                  "psw":"utente1"
              }
              

DPP_Service => DPP document service used to manage (upload/download) the documents
               Running on port 5051
               User credentials to upload doc:
               {
                  "email":"test",
                  "psw":"test"
               }


LTA_Service => old service used to save documents. DEPRECATED

FC_DB_Data => Data of Federated Central service DB used to store documents URL. This folder will be created with the container for mongoDB

Web_App => User UI to use the DPP Infrastructure.
          Running on port 5054


USAGE:

1) Clone repository on your computer.
2) Copy the ".env" file inside the DPP_Service folder.
3) Open terminal from the repository folder
4) Open Docker
5) In the terminal run the following command:
   #docker compose up -d
   and wait for the setup
  (sometimes the fc_service could crash because it tries to connect to fc_db which has not yet started. Just wait for the fc_db finish to start up and then restart fc_service).
  
7) From your browser enter the following URL to http://localhost:5054/www/ to access the Web App

The mongoDB server is configured to create two dpps object and a user during the initialization:
dpp1: _id: 12345678901234
dpp2: _id: 9876543210
user1: _id: utente1, psw: utente1

From the web app you can search for one of this object and get the link to their DPP.

In case of problems with access to services add the following entries to your hosts file:
127.0.0.1     dpp_service
127.0.0.1     fc_service
      
