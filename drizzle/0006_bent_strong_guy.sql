PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_column` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.810Z"' NOT NULL,
	`user` text NOT NULL,
	`color` text NOT NULL,
	`description` text NOT NULL,
	`order` integer NOT NULL,
	`check` integer DEFAULT false
);
--> statement-breakpoint
INSERT INTO `__new_column`("id", "created", "user", "color", "description", "order", "check") SELECT "id", "created", "user", "color", "description", "order", "check" FROM `column`;--> statement-breakpoint
DROP TABLE `column`;--> statement-breakpoint
ALTER TABLE `__new_column` RENAME TO `column`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_customer` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.783Z"' NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
INSERT INTO `__new_customer`("id", "created", "name", "description") SELECT "id", "created", "name", "description" FROM `customer`;--> statement-breakpoint
DROP TABLE `customer`;--> statement-breakpoint
ALTER TABLE `__new_customer` RENAME TO `customer`;--> statement-breakpoint
CREATE TABLE `__new_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.805Z"' NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_item`("id", "created", "description") SELECT "id", "created", "description" FROM `item`;--> statement-breakpoint
DROP TABLE `item`;--> statement-breakpoint
ALTER TABLE `__new_item` RENAME TO `item`;--> statement-breakpoint
CREATE UNIQUE INDEX `item_description_unique` ON `item` (`description`);--> statement-breakpoint
CREATE TABLE `__new_job` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.800Z"' NOT NULL,
	`quantity` integer NOT NULL,
	`description` text NOT NULL,
	`priority` text,
	`status` text
);
--> statement-breakpoint
INSERT INTO `__new_job`("id", "created", "quantity", "description", "priority", "status") SELECT "id", "created", "quantity", "description", "priority", "status" FROM `job`;--> statement-breakpoint
DROP TABLE `job`;--> statement-breakpoint
ALTER TABLE `__new_job` RENAME TO `job`;--> statement-breakpoint
CREATE TABLE `__new_job_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.831Z"' NOT NULL,
	`quantity` integer NOT NULL,
	`job_id` text NOT NULL,
	`item_id` text NOT NULL,
	FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_job_items`("id", "created", "quantity", "job_id", "item_id") SELECT "id", "created", "quantity", "job_id", "item_id" FROM `job_items`;--> statement-breakpoint
DROP TABLE `job_items`;--> statement-breakpoint
ALTER TABLE `__new_job_items` RENAME TO `job_items`;--> statement-breakpoint
CREATE TABLE `__new_login` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.839Z"' NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_login`("id", "created", "username", "password_hash") SELECT "id", "created", "username", "password_hash" FROM `login`;--> statement-breakpoint
DROP TABLE `login`;--> statement-breakpoint
ALTER TABLE `__new_login` RENAME TO `login`;--> statement-breakpoint
CREATE UNIQUE INDEX `login_username_unique` ON `login` (`username`);--> statement-breakpoint
CREATE TABLE `__new_menu` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.846Z"' NOT NULL,
	`label` text NOT NULL,
	`menugroup` integer NOT NULL,
	`path` text NOT NULL,
	`order` integer NOT NULL,
	FOREIGN KEY (`menugroup`) REFERENCES `menugroup`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_menu`("id", "created", "label", "menugroup", "path", "order") SELECT "id", "created", "label", "menugroup", "path", "order" FROM `menu`;--> statement-breakpoint
DROP TABLE `menu`;--> statement-breakpoint
ALTER TABLE `__new_menu` RENAME TO `menu`;--> statement-breakpoint
CREATE TABLE `__new_menugroup` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.845Z"' NOT NULL,
	`label` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_menugroup`("id", "created", "label") SELECT "id", "created", "label" FROM `menugroup`;--> statement-breakpoint
DROP TABLE `menugroup`;--> statement-breakpoint
ALTER TABLE `__new_menugroup` RENAME TO `menugroup`;--> statement-breakpoint
CREATE UNIQUE INDEX `menugroup_label_unique` ON `menugroup` (`label`);--> statement-breakpoint
CREATE TABLE `__new_session` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.822Z"' NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_session`("id", "created", "user_id", "expires_at") SELECT "id", "created", "user_id", "expires_at" FROM `session`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-09-03T07:13:14.817Z"' NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`email` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "created", "username", "password_hash", "email", "status") SELECT "id", "created", "username", "password_hash", "email", "status" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);