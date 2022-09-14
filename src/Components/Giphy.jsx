import axios from "axios";
import React, { useEffect, useState } from "react";
import giphyKey from "../Functions/giphyKey";
import Loader from "./Loader";


// const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
//   const { IamAuthenticator } = require('ibm-watson/auth');

const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);


 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: giphyKey,
            limit: 100,
          },
        });
        console.log(results);
        setData(results.data.data);
      } catch (error) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //   fetch(`${url}/v1/analyze?version=2019-07-12`, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Basic ' + btoa(`apikey:${apiKey}`)
  //     },
  //     body: JSON.stringify({
  //         'text': 'I love apples! I do not like oranges.',
  //         'features': {
  //             'sentiment': {
  //                 'targets': [
  //                     'apples',
  //                     'oranges',
  //                     'broccoli'
  //                 ]
  //             },
  //             'keywords': {
  //                 'emotion': true
  //             }
  //         }
  //     })
  // });

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }
    return data.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} alt="#" />
        </div>
      );
    });
  };

  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in few minutes
        </div>
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: giphyKey,
          q: search,
          limit: 100,
        },
      });
      setData(results.data.data);
    } catch (error) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }

    setIsLoading(false);
  };

  return (
    <div className="m-4 search">
        <div className="container-sm">
        {renderError()}
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  History
                </NavLink>
              </li> */}
            </ul>
            <form className="d-flex" role="search">
              <input
                value={search}
                onChange={handleSearchChange}
                type="text"
                placeholder="search gifs"
                className="form-control"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleSubmit}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      </div>
      <div className="container gifs mt-4 ">{renderGifs()}</div>
    </div>
  );
};
export default Giphy;
