# GESTION DES EMPLOIS DU TEMPS_

Une application de gestion d’emploi du temps au sein de l'INSAT

### Environment Variables

The project uses environment variables to configure settings such as the server, database, and authentication.

1. Copy the `example.env` file to create your own `.env` file:

2. Edit the `.env` file and replace the placeholder values with your actual configuration.

3. Example of `example.env`:

   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=password
   DB_NAME=emplois_temps_db
   PORT=3000
   ```

Endpoint for all controllers are tested but not all because some endpoints require the full backend to be tested and the pagination methos are not tested yet

