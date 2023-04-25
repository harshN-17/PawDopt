import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if(!token) return res.status(403).send("Access Denied");

        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft(); 
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next();
    } catch (error) {
        res.status(500).json({error});
    }
}


/*

 {
        "_id": "6434f2bc04d683163507adc6",
        "userId": "6434e4d50812675456f91302",
        "firstName": "test",
        "lastName": "four",
        "description": "with my girl",
        "userPicturePath": "WIN_20230118_16_13_47_Pro.jpg",
        "paws": {},
        "discussion": [],
        "petName": "doggo",
        "petType": "dog",
        "petAge": 4,
        "createdAt": "2023-04-11T05:40:12.167Z",
        "updatedAt": "2023-04-20T11:14:47.039Z",
        "__v": 0
    }
    
*/