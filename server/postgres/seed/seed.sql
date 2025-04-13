BEGIN TRANSACTION;


INSERT into users(name, email, entries, joined) values ('Jess', 'jess@gmail.com', 5, '2025-04-15');
INSERT into login (hash, email) values ('$2y$05$Fe.DRBCSziBqL.ypExFTe..JDtjxyTCen2VhHhoGzReoBqB430anS', 'jess@gmail.com');

COMMIT;