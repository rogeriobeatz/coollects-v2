-- Estrutura do banco de dados para o Coollects
-- Execute este arquivo no seu banco de dados MySQL

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `sobrenome` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `senha` varchar(255) NOT NULL,
  `data_nasc` date NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ultimo_login` timestamp NULL DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `name_cat` varchar(100) NOT NULL,
  `emoji_cat` varchar(10) NOT NULL,
  `desc_cat` text,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir categorias padrão
INSERT INTO `categorias` (`name_cat`, `emoji_cat`, `desc_cat`) VALUES
('Carros', '🚗', 'Miniaturas de carros e veículos'),
('Motos', '🏍️', 'Miniaturas de motos e motocicletas'),
('Caminhões', '🚛', 'Miniaturas de caminhões e veículos pesados'),
('Aviões', '✈️', 'Miniaturas de aviões e aeronaves'),
('Barcos', '🚢', 'Miniaturas de barcos e embarcações'),
('Trens', '🚂', 'Miniaturas de trens e locomotivas'),
('Figuras', '👤', 'Figuras de ação e personagens'),
('Arte', '🎨', 'Obras de arte e pinturas'),
('Moedas', '🪙', 'Moedas e numismática'),
('Selos', '📮', 'Selos postais e filatelia'),
('Livros', '📚', 'Livros e literatura'),
('Música', '🎵', 'Discos, CDs e instrumentos musicais'),
('Esportes', '⚽', 'Itens esportivos e memorabilia'),
('Tecnologia', '💻', 'Gadgets e tecnologia'),
('Outros', '📦', 'Outros tipos de coleções');

-- Tabela de coleções
CREATE TABLE IF NOT EXISTS `collections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `categoria` int(11) NOT NULL,
  `col_name` varchar(255) NOT NULL,
  `col_color` varchar(7) NOT NULL DEFAULT '#650fee',
  `col_desc` text,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `categoria` (`categoria`),
  FOREIGN KEY (`owner_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`categoria`) REFERENCES `categorias` (`cat_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de itens
CREATE TABLE IF NOT EXISTS `itens` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `col_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_img_url` text,
  `item_series` varchar(100),
  `item_series_year` int(4),
  `item_desc` text,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`item_id`),
  KEY `owner_id` (`owner_id`),
  KEY `col_id` (`col_id`),
  FOREIGN KEY (`owner_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`col_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de log de atividades
CREATE TABLE IF NOT EXISTS `activity_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `details` text,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_address` varchar(45),
  `user_agent` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `timestamp` (`timestamp`),
  FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices para melhorar performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_collections_owner ON collections(owner_id);
CREATE INDEX idx_itens_owner ON itens(owner_id);
CREATE INDEX idx_itens_collection ON itens(col_id);
CREATE INDEX idx_activity_user_time ON activity_log(user_id, timestamp);

-- Triggers para atualizar data_atualizacao
DELIMITER $$

CREATE TRIGGER collections_update_trigger 
BEFORE UPDATE ON collections 
FOR EACH ROW 
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP;
END$$

CREATE TRIGGER itens_update_trigger 
BEFORE UPDATE ON itens 
FOR EACH ROW 
BEGIN
    SET NEW.data_atualizacao = CURRENT_TIMESTAMP;
END$$

DELIMITER ;

-- Views úteis
CREATE VIEW vw_collection_stats AS
SELECT 
    c.id,
    c.col_name,
    c.owner_id,
    COUNT(i.item_id) as total_items,
    MAX(i.data_cadastro) as last_item_date
FROM collections c
LEFT JOIN itens i ON c.id = i.col_id AND i.ativo = 1
WHERE c.ativo = 1
GROUP BY c.id, c.col_name, c.owner_id;

CREATE VIEW vw_user_stats AS
SELECT 
    u.id,
    u.nome,
    u.email,
    COUNT(DISTINCT c.id) as total_collections,
    COUNT(i.item_id) as total_items
FROM usuarios u
LEFT JOIN collections c ON u.id = c.owner_id AND c.ativo = 1
LEFT JOIN itens i ON c.id = i.col_id AND i.ativo = 1
WHERE u.ativo = 1
GROUP BY u.id, u.nome, u.email; 