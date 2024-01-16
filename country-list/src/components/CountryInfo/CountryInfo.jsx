import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../Domain/api";
import { Link } from "react-router-dom";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  const borders = country.map((country) => country.borders);

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="country_wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

      {country?.map((country, index) => (
        <div className="country_container" key={index}>
          <div className="country-img">
            <img src={country.flags.png} alt="" />
          </div>

          <div className="country_info">
            <div className="country_left">
              <h3>{country.name.common}</h3>
              <br />
              <h5>
                Native Name: <span>{country.name.common}</span>
              </h5>
              <h5>
                Population: <span>{new Intl.NumberFormat().format(country.population)}</span>
              </h5>
              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Sub Region: <span>{country.subregion}</span>
              </h5>
              <h5>
                Capital: <span>{country.capital}</span>
              </h5>
            </div>
            <div className="country_left">
              <br />
              <br />
              <h5>
                Top Level Domain: <span>{country.tld && country.tld[0]}</span>
              </h5>
              <h5>
                Currencies:{" "}
                <span>
                  {Object.values(country.currencies)
                    .map((currency) => currency.name)
                    .join(", ")}
                </span>
              </h5>
              <h5>
                Languages:{" "}
                <span>
                  {Object.values(country.languages)
                    .map((language) => language)
                    .join(", ")}
                </span>
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
