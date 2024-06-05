-- Inserting sample data for users
INSERT INTO users (username, createdAt) VALUES ('CynicDog', current_timestamp);

-- Inserting sample data for folders
INSERT INTO folders (id, name, parent_id, user_username, createdAt) VALUES
('folder-0', 'All', NULL, 'CynicDog', '2024-06-01 00:00:00'),

('folder-1', 'Java', NULL, 'CynicDog', '2024-06-01 00:01:00'),
('folder-1-1', 'JPA', 'folder-1', 'CynicDog', '2024-06-01 00:02:00'),
('folder-1-1-1', 'Hibernate', 'folder-1-1', 'CynicDog', '2024-06-01 00:23:00'),

('folder-2', 'C#', NULL, 'CynicDog', '2024-06-01 00:03:00'),
('folder-2-1', 'Orleans', 'folder-2', 'CynicDog', '2024-06-01 00:04:00'),
('folder-2-2', 'Entity Framework', 'folder-2', 'CynicDog', '2024-06-01 00:05:00'),

('folder-3', 'JS', NULL, 'CynicDog', '2024-06-01 00:06:00'),

('folder-4', 'Cloud', NULL, 'CynicDog', '2024-06-01 00:07:00'),
('folder-4-1', 'Google Cloud Platform', 'folder-4', 'CynicDog', '2024-06-01 00:08:00'),
('folder-4-2', 'Azure', 'folder-4', 'CynicDog', '2024-06-01 00:09:00'),
('folder-4-2-1', 'GraphAPI', 'folder-4-2', 'CynicDog', '2024-06-01 00:10:00'),

('folder-5', 'Container & Orchestration', NULL, 'CynicDog', '2024-06-01 00:11:00'),
('folder-5-1', 'Docker', 'folder-5', 'CynicDog', '2024-06-01 00:12:00'),
('folder-5-2', 'k8s', 'folder-5', 'CynicDog', '2024-06-01 00:13:00'),

('folder-6', 'Database', NULL, 'CynicDog', '2024-06-01 00:14:00'),
('folder-6-1', 'PostgreSQL', 'folder-6', 'CynicDog', '2024-06-01 00:15:00'),
('folder-6-2', 'SQL Server', 'folder-6', 'CynicDog', '2024-06-01 00:16:00'),

('folder-7', 'Certificates', NULL, 'CynicDog', '2024-06-01 00:17:00'),
('folder-7-1', 'CKA', 'folder-7', 'CynicDog', '2024-06-01 00:18:00'),
('folder-7-2', 'Github Actions', 'folder-7', 'CynicDog', '2024-06-01 00:19:00'),

('folder-8', 'Projects', NULL, 'CynicDog', '2024-06-01 00:20:00'),
('folder-8-1', 'Akouo', 'folder-8', 'CynicDog', '2024-06-01 00:21:00'),
('folder-8-2', 'Archeio', 'folder-8', 'CynicDog', '2024-06-01 00:22:00');

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