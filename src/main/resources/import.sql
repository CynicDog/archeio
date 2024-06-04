-- Inserting sample data for users
INSERT INTO users (username) VALUES ('CynicDog');

-- Inserting sample data for folders
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-0'        , 'All'                         , NULL,          'CynicDog');

INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-1'        , 'Java'                        , NULL,          'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-1-1'      , 'JPA'                         , 'folder-1',    'CynicDog');

INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-2'        , 'C#'                          , NULL,          'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-2-1'      , 'Orleans'                     , 'folder-2',    'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-2-2'      , 'Entity Framework'            , 'folder-2',    'CynicDog');

INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-3'        , 'JS'                          , NULL,          'CynicDog');

INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-4'        , 'Cloud'                       , NULL,          'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-4-1'      , 'Google Cloud Platform'       , 'folder-4',    'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-4-2'      , 'Azure'                       , 'folder-4',    'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-4-2-1'    , 'GraphAPI'                    , 'folder-4-2',  'CynicDog');

INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-5'        , 'Container & Orchestration'   , NULL,          'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-5-1'      , 'Docker'                      , 'folder-5',    'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-5-2'      , 'k8s'                         , 'folder-5',    'CynicDog');

INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-6'        , 'Database'                    , NULL,          'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-6-1'      , 'PostgreSQL'                  , 'folder-6',    'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-6-2'      , 'SQL Server'                  , 'folder-6',    'CynicDog');

INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-7'        , 'Certificates'                , NULL,          'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-7-1'      , 'CKA'                         , 'folder-7',    'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-7-2'      , 'Github Actions'              , 'folder-7',    'CynicDog');

INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-8'        , 'Projects'                    , NULL,          'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-8-1'      , 'Akouo'                       , 'folder-8',    'CynicDog');
INSERT INTO folders (id, name, parent_id, user_username) VALUES ('folder-8-2'      , 'Archeio'                     , 'folder-8',    'CynicDog');

-- Inserting sample data for posts
INSERT INTO post (content, views, votes, timestamp, folder_id, user_username) VALUES

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

Thank you for your interest in the **Awesome Project**! We look forward to collaborating with you.', 150, 25, CURRENT_TIMESTAMP, 'folder-0', 'CynicDog'),

('## Akouo', 200, 15, CURRENT_TIMESTAMP, 'folder-8-1', 'CynicDog'),

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

', 200, 15, CURRENT_TIMESTAMP, 'folder-8-2', 'CynicDog'),

('# Dump / Restore from a docker container


### Dump

```
docker exec -t {CONTAINER_ID} pg_dump --no-owner -U {USERNAME} {DATABASE_NAME} > {BACKUP_FILE_NAME}.sql
```


### Restore

```
cat {BACKUP_FILE_NAME}.sql | docker exec -i {CONTAINER_ID} psql -U postgres -d {DATABASE_NAME}
```

', 200, 15, CURRENT_TIMESTAMP, 'folder-5-1', 'CynicDog');