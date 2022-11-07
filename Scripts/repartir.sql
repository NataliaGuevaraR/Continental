alter PROCEDURE Repartir
    @Ronda int 
AS  
	update carta set estado = 0;
	DECLARE @cnt INT = 0;
	DECLARE @rndm INT = 0;
	WHILE @cnt < 52
	BEGIN
		set @rndm = (SELECT 1 + CRYPT_GEN_RANDOM(1) % (52 - @cnt +1));
		update carta set estado = (@cnt * -1) where id = (SELECT TOP 1 id 
			FROM 
			( 
				SELECT TOP (@rndm) id 
				FROM carta 
				where estado = 0
				ORDER BY id 
			) sub 
			ORDER BY id DESC );
		set @cnt = @cnt + 1;

	END;

	update carta set estado = 1 where estado >= -51 and estado <= (-51 + @Ronda -1);
	update carta set estado = 2 where estado >= (-51 + @Ronda) and estado <= (-51 + 2 * @Ronda -1);
GO  

exec Repartir 6
select * from carta order by estado