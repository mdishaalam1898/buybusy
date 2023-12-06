import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Error() {
  const navigate = useNavigate();

  // Rendering to hamepage after 3 sec
  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);

  return(
    <div style={{textAlign:"center"}}>
        <h1>Error, Something went Wrong</h1>
        <p>Redirecting back to g=homepage..</p>
    </div>
  )
}
