import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Api from "../../Services/axios";


const OtpForm = () => {
  const [otpValues, setOTPValues] = useState<string[]>(["", "", "", ""]);

  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(59);
  const [resendOtp, setResendOtp] = useState(false);

  //otp timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          setResendOtp(true);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  //forr resend otp
  const handleResendOtp = async (e: any) => {
    e.preventDefault();
    setResendOtp(false);
    setSeconds(59);
    let otp = otpValues.join('')
    if (otp.length !== 4) {
        toast.error('Enter a valid otp')
    }
    const res = await Api.post("/user/resendotp", { otp });
    console.log(res);
    if (res.data.status) {
      toast.success("Registration successfull. Please login");
      navigate("/login");
    } else if (!res.data.status) {
      toast.error(res.data.message);
    }
  };

  const handleInputChange = (index: number, event: any) => {
    const { value } = event.target;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTPValues = [...otpValues];
      newOTPValues[index] = value;
      setOTPValues(newOTPValues);
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(
          `otp-${index + 1}`
        ) as HTMLInputElement | null;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleBackspace = (index: number, event: any) => {
    if (event.key === "Backspace" && index > 0 && otpValues[index] === "") {
      const newOTPValues = [...otpValues];
      newOTPValues[index - 1] = "";
      setOTPValues(newOTPValues);
      const prevInput = document.getElementById(
        `otp-${index - 1}`
      ) as HTMLInputElement | null;
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let otp = otpValues.join("");
    if (otp.length !== 4) {
      toast.error("Enter a valid otp");
    }

    const res = await  Api.post("/user/signup",{otp})
    console.log("res orp", res);
    if (res.data.status) {
        toast.success("Registration successfull. Please login")
        navigate("/login");
    }
  };
  return (
    
    <div className="flex w-full justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600 bg-opacity-50 px-6">
        <div
      className="absolute top-0 w-full h-full"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2654.jpg")',
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    />
      <div className="relative bg-white px-6 pt-4 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
       
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
          </div>
          <div>
            <form onSubmit={handleOtpSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row justify-center text-center px-2">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      className="m-2 border-b-2 border-gray-600 text-3xl h-16 w-16 px-5 text-center form-control outline-none"
                      type="text"
                      maxLength={1}
                      value={value}
                      onChange={(event) => handleInputChange(index, event)}
                      onKeyDown={(event) => handleBackspace(index, event)}
                    />
                  ))}
                </div>

                <div className="text-center mt-6">
                  {!resendOtp ? (
                    <button
                      className="bg-purple-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all 0.15s ease 0s" }}
                    >
                      Sign In
                    </button>
                  ) : (
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#3A244A] border-none text-white text-sm shadow-sm"
                      type="submit"
                      style={{ transition: "all 0.15s ease 0s" }}
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  )}
                  {!resendOtp && (
                    <div className="countdown-text">
                      <p>
                        Time Remaining: 00:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    </div>
                  )}
                </div>

                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
