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

FC_DB_Data => Data of Federated Central service DB used to store documents URL

Web_App => User UI to use the DPP Infrastructure.
          Running on port 5054


USAGE:

1) Clone repository on your computer.
2) Copy the ".env" file inside the DPP_Service folder.
3) Open terminal from the repository folder
4) Open Docker
5) In the terminal run the compose file with:
    #docker compose up -d
   and wait for the setup
6) From your browser enter the following URL to http://localhost:5054/www/ to access the Web App

Actually on the MongoDB server there are two registered object: 
1) _id: 12345678901234
2) _id: 9876543210

From the web app you can search for one of this object and get the link to their DPP.

In case of problems with access to services add the following entries to your hosts file:
127.0.0.1     dpp_service
127.0.0.1     fc_service
      
