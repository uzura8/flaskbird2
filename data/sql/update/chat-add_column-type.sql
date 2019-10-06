ALTER TABLE `chat` ADD COLUMN `type` enum('public', 'private', 'support') NOT NULL DEFAULT 'public';
