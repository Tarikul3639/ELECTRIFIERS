//Client\src\Page\Login.jsx
import background from '../assets/Image/background.jpg';
const Registration = () => {
    return (
        <div className="h-[90%] w-[95%] bg-[#004355] bg-cover bg-center rounded-[20px] flex flex-col justify-center p-[40px]"
        style={{ backgroundImage: `url(${background})` }}
        >
            <h1 className='text-[20px]'>Create new account</h1>
            <p>Already A Member? <span className="text-blue-500 cursor-pointer ">Login</span></p>
            <form>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Registration;

