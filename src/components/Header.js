import "./header.css";
export const Header = () => {
  return (
    <div className="header">
      <div className="cta-group">
        {sessionStorage.getItem("token") ? (
          <button
            onClick={() => {
              sessionStorage.clear();
              window.location.replace("/");
            }}
          >
            Wyloguj
          </button>
        ) : (
          <button onClick={() => window.location.replace("/")}>Zaloguj</button>
        )}
      </div>
    </div>
  );
};
