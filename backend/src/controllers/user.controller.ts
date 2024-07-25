import { Request, Response } from 'express'
import { userService } from '../services/user.service'
import { userSchema } from '../validators/user.validator'

let service = new userService()

export class userController {
    async createUser (req: Request, res: Response) {
        try {
            console.log('Request Body:', req.body);
            let {firstName, lastName, phoneNumber, email, password} = req.body;
            let {error} = userSchema.validate(req.body);

            if(error) {
                return res.status(401).json({
                    error: error.message
                });
            }
            let result = await service.registerUser(req.body);

            return res.status(201).json(result);
        } catch (error) {
            return res.json({
                error
            });
        }
    }

    async fetchAll(req: Request, res: Response) {
        try {
            let result = await service.fetchAllUsers()

            return res.status(201).json(result)
        } catch (error) {
            return res.json({
                error
            })
        }
    }

    async fetchSingleUser(req:Request, res: Response) {
        try {
            let {user_id} = req.params
            let response = await service.fetchSingleUser(user_id)
            return res.json(response)
        } catch (error) {
            return res.json ({
                error
            })
        }
    }

    async switchRoles(req: Request, res: Response): Promise<Response> {
        try {
            const { user_id } = req.body;

            // Ensure user_id is provided
            if (!user_id) {
                return res.status(400).json({ error: "User ID is required" });
            }

            const response = await service.switchRoles(user_id);

            // Handle the response from the service
            if (response.error) {
                return res.status(500).json({ error: response.error });
            }

            return res.status(200).json(response);
        } catch (error) {
            // Handle unexpected errors
            if (error instanceof Error) {
                console.error("Error in switchRoles controller:", error.message);
                return res.status(500).json({ error: `Error in switchRoles controller: ${error.message}` });
            } else {
                console.error("Unexpected error in switchRoles controller:", error);
                return res.status(500).json({ error: "Unexpected error occurred while switching roles." });
            }
        }
    }

    
    async updateUser(req: Request, res: Response) {
        try {
            let { user_id } = req.params;
            let updatedUser = req.body;

            let result = await service.updateUser(user_id, updatedUser);

            if (result.error) {
                return res.status(400).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            // Handle errors here with a more generic approach
            const errorMessage = error instanceof Error ? error.message : 'Internal server error';
            return res.status(500).json({
                error: `Internal server error: ${errorMessage}`
            });
        }
    }
}