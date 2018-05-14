DROP TABLE IF EXISTS `panorama_info`;
CREATE TABLE `panorama_info` (
    `id` INT(12) NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(256) default '',
    `image_arr` text,
    `create_time` DATE,
    `update_time` DATE,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
