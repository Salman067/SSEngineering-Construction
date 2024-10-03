import  { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import ShowPassword from '../shared/ShowPassword';
import ErrorShow from '../shared/ErrorShow';
import validateInputs from '../../utils/formValidation.util';


export default function SignupForm({ onSubmit, signupError, setSignupError }) {
   const [inputs, setInputs] = useState({ firstName: "", lastName: "", email: "", password: "", phone: "", userType: "" });
   const [showPassword, setShowPassword] = useState(false);
   const [validationErrors, setValidationErrors] = useState(null); // To hold validation errors


   const handleSubmit = async (event) => {
       event.preventDefault();
      
       const validationError = validateInputs(inputs);
       if (validationError) {
           setValidationErrors(validationError);
           setSignupError(null);
       } else {
           setValidationErrors(null);
           setSignupError(null);
  
           const formData = {
               first_name: inputs.firstName,
               last_name: inputs.lastName,
               email: inputs.email,
               password: inputs.password,
               phone: inputs.phone,
               user_type: inputs.userType
           };
  
           try {
               const response = await onSubmit(formData);
               // Clear any previous errors on success
               setSignupError(null);
              
               if (response.data && response.data.error === 'user already registered') {
                   toast.error("User already registered, please log in.");
                   setSignupError("User already registered, please log in.");
               } else {
                   toast.success("Signup successful! Welcome to our community.");
               }
           } catch (error) {
               if (error.response && error.response.data && error.response.data.error) {
                   toast.error(error.response.data.error);
                   setSignupError(error.response.data.error);
               }
           }
       }
   };
  
  
  
   const onTogglePassword = (showPassword) => {
       setShowPassword(showPassword);
   };


   const handleChange = (event) => {
       const { name, value } = event.target; // Destructure to get name and value
       setInputs((prevInputs) => ({ ...prevInputs, [name]: value })); // Update state correctly
   };


   return (
       <>
           <form onSubmit={handleSubmit}>
               {/* First Name */}
               <div className="mb-4">
                   <label htmlFor="first_name" className="block font-medium mb-1">
                       First Name
                   </label>
                   <input
                       type="text"
                       id="first_name"
                       name="firstName"
                       value={inputs.firstName || ""}
                       onChange={handleChange}
                       placeholder="Enter your first name"
                       required
                       className={`w-full px-3 py-2 border rounded focus:outline-none ${signupError || validationErrors?.firstName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                   />
                   {validationErrors && validationErrors.firstName && <span className="text-red-500">{validationErrors.firstName}</span>}
               </div>
              
               {/* Last Name */}
               <div className="mb-4">
                   <label htmlFor="last_name" className="block font-medium mb-1">
                       Last Name
                   </label>
                   <input
                       type="text"
                       id="last_name"
                       name="lastName"
                       value={inputs.lastName || ""}
                       onChange={handleChange}
                       placeholder="Enter your last name"
                       required
                       className={`w-full px-3 py-2 border rounded focus:outline-none ${signupError || validationErrors?.lastName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                   />
                   {validationErrors && validationErrors.lastName && <span className="text-red-500">{validationErrors.lastName}</span>}
               </div>


               {/* Email */}
               <div className="mb-4">
                   <label htmlFor="email" className="block font-medium mb-1">
                       Email
                   </label>
                   <input
                       type="email"
                       id="email"
                       name="email"
                       value={inputs.email || ""}
                       onChange={handleChange}
                       placeholder="Enter your email"
                       required
                       className={`w-full px-3 py-2 border rounded focus:outline-none ${signupError || validationErrors?.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                   />
                   {validationErrors && validationErrors.email && <span className="text-red-500">{validationErrors.email}</span>}
               </div>


               {/* Phone Number */}
               <div className="mb-4">
                   <label htmlFor="phone" className="block font-medium mb-1">
                       Phone Number
                   </label>
                   <input
                       type="tel"
                       id="phone"
                       name="phone"
                       value={inputs.phone || ""}
                       onChange={handleChange}
                       placeholder="Enter your phone number"
                       required
                       className={`w-full px-3 py-2 border rounded focus:outline-none ${signupError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                   />
               </div>


               {/* User Type (Optional) */}
               <div className="mb-4">
                   <label htmlFor="user_type" className="block font-medium mb-1">
                       User Type (Optional)
                   </label>
                   <select
                       id="user_type"
                       name="userType"
                       value={inputs.userType || ""}
                       onChange={handleChange}
                       className="w-full px-3 py-2 border rounded focus:outline-none border-gray-300 focus:border-blue-500"
                   >
                       <option value="">Select User Type</option>
                       <option value="admin">Admin</option>
                       <option value="user">User</option>
                       <option value="guest">Guest</option>
                   </select>
               </div>


               {/* Password */}
               <div className="mb-6 relative">
                   <label htmlFor="password" className="block font-medium mb-1">
                       Password
                   </label>
                   <input
                       type={showPassword ? 'text' : 'password'}
                       id="password"
                       name="password"
                       value={inputs.password || ""}
                       onChange={handleChange}
                       required
                       className={`w-full px-3 py-2 border rounded focus:outline-none ${signupError || validationErrors?.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                       placeholder="Enter your password"
                   />
                   <ShowPassword showPassword={showPassword} onTogglePassword={onTogglePassword} />
                   {validationErrors && validationErrors.password && <span className="text-red-500">{validationErrors.password}</span>}
               </div>


               {/* Submit Button */}
               <div className="mb-4">
                   <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
                       Sign Up
                   </button>
               </div>


               {/* Global Error Message */}
               {signupError && <ErrorShow message={signupError} />}


               {/* Toast Container */}
               <ToastContainer />
           </form>
       </>
   );
}


