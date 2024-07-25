CREATE PROCEDURE registerUser
    @id VARCHAR(255),
    @firstName VARCHAR(255),
    @lastName VARCHAR(255),
    @phoneNumber VARCHAR(20),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @createdAt DATETIME
AS
BEGIN
    INSERT INTO users (id, firstName, lastName, phoneNumber, email, password,createdAt)
    VALUES (@id, @firstName, @lastName, @phoneNumber, @email, @password,@createdAt);
END;

drop procedure registerUser
