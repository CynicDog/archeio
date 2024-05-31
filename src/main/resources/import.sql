-- Inserting sample data for folders
INSERT INTO folders (id, name, parent_id) VALUES ('folder-0'        , 'All'                         , NULL);

INSERT INTO folders (id, name, parent_id) VALUES ('folder-1'        , 'Java'                        , NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-1-1'      , 'JPA'                         , 'folder-1');

INSERT INTO folders (id, name, parent_id) VALUES ('folder-2'        , 'C#'                          , NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-2-1'      , 'Orleans'                     , 'folder-2');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-2-2'      , 'Entity Framework'            , 'folder-2');

INSERT INTO folders (id, name, parent_id) VALUES ('folder-3'        , 'JS'                          , NULL);

INSERT INTO folders (id, name, parent_id) VALUES ('folder-4'        , 'Cloud'                       , NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-4-1'      , 'Google Cloud Platform'       , 'folder-4');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-4-2'      , 'Azure'                       , 'folder-4');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-4-2-1'    , 'GraphAPI'                    , 'folder-4-2');

INSERT INTO folders (id, name, parent_id) VALUES ('folder-5'        , 'Container & Orchestration'   , NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-5-1'      , 'Docker'                      , 'folder-5');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-5-2'      , 'k8s'                         , 'folder-5');

INSERT INTO folders (id, name, parent_id) VALUES ('folder-6'        , 'Database'                    , NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-6-1'      , 'PostgreSQL'                  , 'folder-6');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-6-2'      , 'SQL Server'                  , 'folder-6');

INSERT INTO folders (id, name, parent_id) VALUES ('folder-7'        , 'Certificates'                , NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-7-1'      , 'CKA'                         , 'folder-7');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-7-2'      , 'Github Actions'              , 'folder-7');

INSERT INTO folders (id, name, parent_id) VALUES ('folder-8'        , 'Projects'                    , NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-8-1'      , 'Akouo'                       , 'folder-8');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-8-2'      , 'Archeio'                     , 'folder-8');

-- Inserting sample data for posts
INSERT INTO post (content, views, votes, timestamp, folder_id) VALUES

('## Contributing

We welcome contributions from the community! Here are a few ways you can get involved:

- **Report Bugs**: If you find a bug, please [open an issue](https://github.com/your-username/awesome-project/issues).

- **Submit Pull Requests**: We accept pull requests for new features, bug fixes, and improvements.

- **Improve Documentation**: Help us improve our documentation by making it clearer and more comprehensive.

### Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all. Please read and adhere to our [Code of Conduct](https://github.com/your-username/awesome-project/blob/main/CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/your-username/awesome-project/blob/main/LICENSE) file for details.

## Contact

If you have any questions, feel free to reach out to us:

- **Email**: support@awesomeproject.com

- **Twitter**: [@awesomeproject](https://twitter.com/awesomeproject)

- **GitHub**: [github.com/your-username/awesome-project](https://github.com/your-username/awesome-project)

Thank you for your interest in the **Awesome Project**! We look forward to collaborating with you.', 150, 25, CURRENT_TIMESTAMP, 'folder-0'),

('## Akouo', 200, 15, CURRENT_TIMESTAMP, 'folder-8-1'),

('## Archeio

- TODO

- 1. ~~tags deletion~~
  2. ~~sidebar tags get/refetch~~
  3. ~~add new post per child folder~~
  4. delete a post
  5. post retrieve by tags (on click)
  6. tags breadcrumbs display
  7. ~~add folder button move to breadcrumbs~~
  8. authentication (Google OAuth2 One Tab or popup)
  9. text preview for users other than me
  10. deploy to GKE
  11. pave connection over cloud sql
  12. SEO for SPA

', 200, 15, CURRENT_TIMESTAMP, 'folder-8-2'),

('# Dump / Restore from a docker container


### Dump

```
docker exec -t {CONTAINER_ID} pg_dump --no-owner -U {USERNAME} {DATABASE_NAME} > {BACKUP_FILE_NAME}.sql
```


### Restore

```
cat {BACKUP_FILE_NAME}.sql | docker exec -i {CONTAINER_ID} psql -U postgres -d {DATABASE_NAME}
```

', 200, 15, CURRENT_TIMESTAMP, 'folder-5-1'),


('# Github Actions in Action

 GitHub Actions is a CI/CD platform that automates software workflows through customizable tasks and triggers within GitHub repositories.

 ### Introduction to Github Actions

 Github Actions is both the name of the workflow engine and the name of an individual, reusable and easily sharable workflow step within Github.

 **Workflows** are composed of YAML files that are stored in a specific repository location(`.github/workflows`).

 **Triggers** initiate the workflow, and one or more **jobs** are included in the workflow.

 **Jobs** are executed on a workflow runner, which can be a machine or container with an installed runnner service.

 A job is comprised of one or more **steps** that are executed sequentially. A step can take the form of a command line, script, or reusable step that is easily shareable, known as a Github Action.

 Here''s what a workflow specification looks like:

 ```
 name: My First Workflow

 on:
   push:
     branches:
       - main

 jobs:
   MyFirstJob:
     runs-on: ubuntu-latest
     steps:
       - name: Hello Github Actions
         run: echo "Hello Github Actions!"

       - name: Checkout
         uses: actions/checkout@v4.1.5

       - name: List files in the repository
         run: |
           echo "The repository ${{ github.repository }} contains the following files: "
           tree
 ```

 ### Triggers

 There are three types of triggers:

 - - **Webhook triggers**: on events such as

   - ```
     on: [push, pull_request]
     ```

     For a complete list of the events that can trigger workflows, please refer to: <https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows>.


 - - **Scheduled triggers:** cron jobs specification such as

   - ```
     on:
       schedule:
         # Runs at every 15th minute
         - cron:  ''*/15 * * * *''
         # Runs every hour from 9am to 5pm
         - cron:  ''0 9-17 * * *''
         # Runs every Friday at midnight
         - cron:  ''0 0 * * FRI''
         # Runs every quarter (00:00 on day 1 every 3rd month)
         - cron:  ''0 0 1 */3 *''
     ```

 - - **Manual triggers**

   - `workflow_dispatch`

   - `repository_dispatch`

'
, 200, 15, CURRENT_TIMESTAMP, 'folder-7-2'    );