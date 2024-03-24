import * as yup from 'yup';



//Profile type
export type Profile = yup.InferType<typeof profileSchema>;

// Using Infertype to make sure we dont type the props twice
// so we can just update the schema and we will get the type
// export type Profile = {
//     id: string;
//     username?: string;
//     firstName?: string;
//     lastName?: string;
//     fullName?: string; 
//     avatarUrl?: string;
//     website?: string;
//     updatedAt?: Date;
// };

// Define a Yup validation schema for the Profile type
export const profileSchema = yup.object().shape({
  id: yup.string().required('ID is required'), // Assuming ID should be provided; adjust as necessary
  username: yup.string().optional(), // Optional field, add validation as needed
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  fullName: yup.string().optional(),
  avatarUrl: yup.string().url().optional(), // Validate URL format if avatarUrl is provided
  website: yup.string().url().optional(), // Validate URL format if website is provided
  updatedAt: yup.date().optional(), // Validate date if updatedAt is provided
});
