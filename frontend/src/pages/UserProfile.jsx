import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateProfile } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { reset } from '../features/auth/authSlice';
import { profileUpdate } from '../features/auth/authSlice';



function UserProfile() {
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        email: user ? user.email : ''
    });
    const [image, setImage] = useState(""); 
    

 

    const { name, email } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        // if (isLoading) {
        //     return <Spinner />;
        // }
        if (isSuccess) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const uploadImage = (e) => {
        e.preventDefault()

        if (!image) {
            toast.error("please upload a file")

            return
        }
        
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "elellcsz");
        data.append("cloud_name", "dzkpcjjr8");

        fetch("https://api.cloudinary.com/v1_1/dzkpcjjr8/image/upload", {
            method: "post",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("CAll 1",data.url);
                dispatch(profileUpdate(data.url))
            })
            .catch((err) => console.log(err));

    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            for (const key in validationErrors) {
                toast.error(validationErrors[key]);
            }
            return;
        }

        dispatch(updateProfile(formData));
    };

    const validateForm = () => {
        let errors = {};

        if (!name.trim()) {
            errors.name = 'Name is required';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        return errors;
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Profile
                </h1>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={onChange}
                            
                           
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Update</button>
                    </div>
                </form>
            </section>

        </>
    );
}

export default UserProfile;
