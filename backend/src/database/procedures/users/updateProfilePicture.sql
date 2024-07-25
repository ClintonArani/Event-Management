CREATE PROCEDURE updateProfilePicture
    @user_id VARCHAR (255),
    @profile VARCHAR(255)
AS
BEGIN
    UPDATE users
    SET profile = @profile
    WHERE id = @user_id;
END;

drop procedure updateProfilePicture