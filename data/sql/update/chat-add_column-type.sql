ALTER TABLE `chat` ADD COLUMN `type` enum('public', 'private') NOT NULL DEFAULT 'private';
