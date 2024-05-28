-- Inserting sample data for folders
INSERT INTO folders (id, name, parent_id) VALUES ('folder-0', 'All', NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-1', 'Technologies', NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-1-1', 'Java', 'folder-1');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-1-2', 'C#', 'folder-1');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-1-3', 'JS', 'folder-1');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-2', 'Cloud', NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-2-1', 'Google Cloud Platform', 'folder-2');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-2-2', 'Azure', 'folder-2');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-3', 'Container & Orchestration', NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-3-1', 'Docker', 'folder-3');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-3-2', 'k8s', 'folder-3');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-4', 'Projects', NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-4-1', 'Akouo', 'folder-4');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-4-2', 'Archeio', 'folder-4');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-5', 'Database', NULL);
INSERT INTO folders (id, name, parent_id) VALUES ('folder-5-1', 'PostgreSQL', 'folder-5');
INSERT INTO folders (id, name, parent_id) VALUES ('folder-5-2', 'SQL Server', 'folder-5');

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
('## Akouo', 200, 15, CURRENT_TIMESTAMP, 'folder-4-1'),
('## Archeio

- TODO

- 1. tags deletion
  2. ~~sidebar tags get/refetch~~
  3. ~~add new post per child folder~~
  4. delete a post
', 200, 15, CURRENT_TIMESTAMP, 'folder-4-2'),
('# Dump / Restore from a docker container



### Dump

```
docker exec -t {CONTAINER_ID} pg_dump --no-owner -U {USERNAME} {DATABASE_NAME} > {BACKUP_FILE_NAME}.sql
```


### Restore

```
cat {BACKUP_FILE_NAME}.sql | docker exec -i {CONTAINER_ID} psql -U postgres -d {DATABASE_NAME}
```

', 200, 15, CURRENT_TIMESTAMP, 'folder-5-1');


