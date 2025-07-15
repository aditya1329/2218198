import { useRef } from "react";
import axios from "axios";

const Home = () => {
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(formRef.current);

    console.log(formdata.get("url"));

    // Here you would typically send the form data to your backend API
    // For example:
    const response = await axios.post("http://localhost:3000/api/shorten", {
      originalUrl: formdata.get("url"),
    });
    const data = response.data;
    console.log(data);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="text-7xl">Shorten Your Links</h1>
        <p className="text-2xl">
          Create short, branded links that are easy to share and track.
        </p>
      </div>

      <div className="mt-10">
        <div className="rounded-xl w-[700px] flex items-center justify-between gap-6">
          <div className="w-full">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="w-full flex items-center gap-4"
            >
              <input
                className="w-full border border-white/30 p-4 rounded-lg outline-none focus:border-blue-400 transition-all duration-300 text-xl tracking-wide"
                type="text"
                placeholder="enter your url here..."
                name="url"
              />
              <input
                type="submit"
                value={"Shorten url"}
                className="bg-green-400 p-4 rounded-full text-black font-medium tracking-wide"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
