import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, register, reset } from "../redux/userSlice";
import { toast } from "react-toastify";
import "../scss/New.scss";
import { useNavigate } from "react-router-dom";

const New = () => {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRegisterSuccess, isRegisterError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isRegisterError) {
      toast.error(`Error occured: ${message.message}`);
      dispatch(reset());
    }
    if (isRegisterSuccess) {
      toast.success(`Registered successfully`);
      dispatch(reset());
      dispatch(getUsers());
      navigate("/users");
    }
  }, [isRegisterSuccess, isRegisterError, message, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      first_name: firstnameRef.current.value,
      last_name: lastnameRef.current.value,
      email: emailRef.current.value,
      age: ageRef.current.value,
    };

    dispatch(register(userDetails));

    firstnameRef.current.value = "";
    lastnameRef.current.value = "";
    emailRef.current.value = "";
    ageRef.current.value = "";
  };

  return (
    <div className="new">
      <form onSubmit={handleSubmit}>
        <h1>Register Student</h1>
        <div className="formInput">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            placeholder="Enter first name"
            ref={firstnameRef}
            required
          />
        </div>
        <div className="formInput">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            placeholder="Enter last name"
            ref={lastnameRef}
            required
          />
        </div>
        <div className="formInput">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="abc@gmail.com"
            ref={emailRef}
            required
          />
        </div>
        <div className="formInput">
          <label htmlFor="age">Age</label>
          <input type="date" id="age" ref={ageRef} required />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default New;
