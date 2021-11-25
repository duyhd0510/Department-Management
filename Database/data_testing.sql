/*============================== INSERT DATABASE =======================================*/
/*======================================================================================*/
-- Add data Department
INSERT INTO Department(DepartmentName,		author_id,		CreateDate  	) 
VALUES
						(N'Marketing'	,    '1',			'2020-03-05'	),
						(N'Sale'		,    '2',		    '2020-03-05'	),
						(N'Bảo vệ'		,    '5',		    '2020-03-07'	),
						(N'Nhân sự'		,    '7',			'2020-03-08'	),
						(N'Kỹ thuật'	,    '3',			'2020-03-10'	),
						(N'Tài chính'	,    '8',				NOW()		),
						(N'Phó giám đốc',    '9',				NOW()		),
						(N'Giám đốc'	,    '6',			'2020-04-07'	),
						(N'Thư kí'		,    '4',			'2020-04-07'	),
						(N'Bán hàng'	,    '10',			'2020-04-09'	);
	
   

-- Add data Account
-- password 123456
INSERT INTO `Account`(Email								, Username 			,`password`															, FirstName,	LastName,		 DepartmentID	, 	CreateDate, 	`role`		)
VALUES 				('haidang29productions@gmail.com'	, 'dangblack',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Dang'	,		'Nguyen Hai'	,   '5'			, 	'2020-03-05',	'Admin'		),
					('account1@gmail.com'				, 'quanganh',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Anh'	,		'Tong Quang'	,   '1'			,  	'2020-03-05',	'User'		),
                    ('account2@gmail.com'				, 'vanchien',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Chien',		'Nguyen Van'	,   '2'			,   '2020-03-07',	'Manager'	),
                    ('account3@gmail.com'				, 'cocoduongqua',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Do'	,		'Duong'			,   '3'			,  	'2020-03-08',	'Admin'		),
                    ('account4@gmail.com'				, 'doccocaubai',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Thang',		'Nguyen Chien'  ,   '4'			,   '2020-03-10',	'User'		),
                    ('dapphatchetngay@gmail.com'		, 'khabanh',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Kha'	,		'Ngo Ba'		,   '6'			,   	NOW(),		'Manager'	),
                    ('songcodaoly@gmail.com'			, 'huanhoahong',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Huan'	,		'Bui Xuan'		,   '7'			,   	NOW(),		'Admin'		),
                    ('sontungmtp@gmail.com'				, 'tungnui',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Tung'	,		'Nguyen Thanh'	,   '8'			,   '2020-04-07',	'Manager'	),
                    ('duongghuu@gmail.com'				, 'duongghuu',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Huu'	,		'Duong Van'		,   '9'			,   '2020-04-07',	'User'		),
                    ('vtiaccademy@gmail.com'			, 'vtiaccademy',	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'		,'Ai'	,		'Vi Ti'			,   '10'		,   '2020-04-09',	'Manager'	);
				
                    
ALTER TABLE Department
ADD FOREIGN KEY (author_id) REFERENCES `Account`(AccountID); 
