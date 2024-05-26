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

-- Inserting sample data for posts
INSERT INTO post (content, views, votes, timestamp, folder_id) VALUES
                                                                   ('Sample post content 1', 100, 10, CURRENT_TIMESTAMP, 'folder-1-1'), -- Post in Java folder
                                                                   ('Sample post content 2', 150, 20, CURRENT_TIMESTAMP, 'folder-1-2'), -- Post in C# folder
                                                                   ('Sample post content 3', 200, 15, CURRENT_TIMESTAMP, 'folder-1-3'); -- Post in JS folder
