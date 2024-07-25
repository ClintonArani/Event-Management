CREATE PROCEDURE fetchSingleUser
    @user_id VARCHAR (255)
AS
BEGIN
    SELECT * FROM users WHERE id = @user_id;
END