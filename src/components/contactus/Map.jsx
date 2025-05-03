import { Link } from "react-router-dom";


const Map = () => (
    <section className="mt-48 md:mt-18">
        <div style={{ position: "relative", width: "100%", height: "400px" }}>
            <iframe
                src="https://maps.google.com/maps?q=san+francisco&output=embed"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                }}
                loading="lazy"
                allowFullScreen
                title="Google Map"
            ></iframe>
            <Link
                to="https://freeairecipegenerator.com"
                rel="noopener noreferrer"
                target="_blank"
                style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0,0,0,0)",
                    whiteSpace: "nowrap",
                    border: 0,
                }}
            >
                freeairecipegenerator.com
            </Link>
        </div>
    </section>
);

export default Map;