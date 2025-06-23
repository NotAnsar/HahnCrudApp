-- User Table
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       first_name VARCHAR(100) NOT NULL,
                       last_name VARCHAR(100) NOT NULL,
                       role VARCHAR(20) NOT NULL DEFAULT 'USER',
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert 20 sample users
INSERT INTO users (username, email, password, first_name, last_name, role) VALUES
                                                                               ('karrouach.ansar', 'karrouach.ansar@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ansar', 'Karrouach', 'ADMIN'),
                                                                               ('youssef.benali', 'youssef@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Youssef', 'Benali', 'ADMIN'),
                                                                               ('fatima.amrani', 'fatima@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Fatima', 'El Amrani', 'USER'),
                                                                               ('mohamed.tazi', 'mohamed@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mohamed', 'Tazi', 'USER'),
                                                                               ('omar.bouazza', 'omar@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Omar', 'Bouazza', 'USER'),
                                                                               ('aisha.alami', 'aisha@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Aisha', 'Alami', 'USER'),
                                                                               ('hassan.idrissi', 'hassan@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Hassan', 'Idrissi', 'USER'),
                                                                               ('laila.zemrani', 'laila@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Laila', 'Zemrani', 'ADMIN'),
                                                                               ('khalid.rifai', 'khalid@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Khalid', 'Rifai', 'USER'),
                                                                               ('samira.hajji', 'samira@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Samira', 'Hajji', 'USER'),
                                                                               ('rachid.bennani', 'rachid@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Rachid', 'Bennani', 'USER'),
                                                                               ('nadia.fassi', 'nadia@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Nadia', 'Fassi', 'USER'),
                                                                               ('abderrahim.senhaji', 'abderrahim@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Abderrahim', 'Senhaji', 'USER'),
                                                                               ('zineb.benali', 'zineb@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Zineb', 'Benali', 'USER'),
                                                                               ('jamal.charaf', 'jamal@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jamal', 'Charaf', 'ADMIN'),
                                                                               ('karima.lahlou', 'karima@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Karima', 'Lahlou', 'USER'),
                                                                               ('said.ouali', 'said@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Said', 'Ouali', 'USER'),
                                                                               ('houria.mernissi', 'houria@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Houria', 'Mernissi', 'USER'),
                                                                               ('mustapha.kadiri', 'mustapha@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mustapha', 'Kadiri', 'USER'),
                                                                               ('souad.benjelloun', 'souad@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Souad', 'Benjelloun', 'USER');