import {Link, useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ErrorComponent({title, description}) {
    const navigate = useNavigate()
    const handlePrevPage = () =>{
        navigate(-1)
    }

    return (
        <main style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div>
            <h1>{title}</h1>
            <p>
                {description}
            </p>
            <div style={{
                display:"flex",
                justifyContent:"space-around"
            }}>
                <button onClick={handlePrevPage}>Back</button>
                <Link to={"/"}>Go to Home</Link>
            </div>
            </div>
        </main>
    );
}

