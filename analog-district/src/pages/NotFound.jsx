import "./NotFound.css";
import { Header } from "../components/Header";

export function NotFound() {
  return (
    <>
      <title>Not Found</title>
      <Header />
      <div className="not-found-container">
        <div className="not-found-title">
          <h1>404 - Not Found</h1>
        </div>
      </div>
    </>
  );
}
