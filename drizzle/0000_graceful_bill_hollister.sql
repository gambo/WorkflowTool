CREATE TABLE `column` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.380Z"' NOT NULL,
	`user` text NOT NULL,
	`color` text NOT NULL,
	`description` text NOT NULL,
	`order` integer NOT NULL,
	`check` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.359Z"' NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.372Z"' NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `item_description_unique` ON `item` (`description`);--> statement-breakpoint
CREATE TABLE `job` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.366Z"' NOT NULL,
	`quantity` integer NOT NULL,
	`description` text NOT NULL,
	`priority` text,
	`status` text
);
--> statement-breakpoint
CREATE TABLE `job_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.399Z"' NOT NULL,
	`quantity` integer NOT NULL,
	`job_id` text NOT NULL,
	`item_id` text NOT NULL,
	FOREIGN KEY (`job_id`) REFERENCES `job`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `login` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.406Z"' NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `login_username_unique` ON `login` (`username`);--> statement-breakpoint
CREATE TABLE `menu` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.417Z"' NOT NULL,
	`label` text NOT NULL,
	`menugroup` text NOT NULL,
	`path` text NOT NULL,
	`order` integer NOT NULL,
	FOREIGN KEY (`menugroup`) REFERENCES `menugroup`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `menugroup` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.416Z"' NOT NULL,
	`label` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.396Z"' NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer DEFAULT '"2025-08-30T17:17:49.391Z"' NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`email` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);