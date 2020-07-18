import React, { useState, useEffect } from "react";
import axios from "axios";
import sort from "fast-sort";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
export default function () {
  const [countries, setCountries] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    (async () => {
      const url =
        "https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;capital;region;population;area;nativeName;flag";
      let { data } = await axios.get(url);
      data = data.map((v) =>
        Object.fromEntries(
          Object.entries(v).sort((a, b) => (a[0] > b[0] ? 1 : -1))
        )
      );
      setCountries(data);
    })();
  }, []);
  const sortTable = (data, e) => {
    setloading(true);
    const s = e.target.dataset.sort === "asc" ? "asc" : "desc";
    setTimeout(() => {
      sort(countries)[s]((v) => v[data]);
      setCountries([...countries]);
      setloading(false);
    }, 700);
    e.target.dataset.sort = s === "asc" ? "desc" : "asc";
  };
  return (
    <>
      <table id="form-table">
        <thead>
          <tr>
            {countries.length
              ? Object.keys(countries[0]).map((v, i) => (
                  <th key={i} data-sort="none" onClick={(e) => sortTable(v, e)}>
                    {v}
                  </th>
                ))
              : null}
          </tr>
        </thead>
        <tbody>
          {countries.length
            ? countries.map(
                (
                  {
                    name,
                    alpha2Code,
                    capital,
                    region,
                    population,
                    area,
                    nativeName,
                    flag,
                  },
                  i
                ) => (
                  <tr key={i}>
                    <td>{alpha2Code}</td>
                    <td>{area}</td>
                    <td>{capital}</td>
                    <td>
                      <img
                        src={flag}
                        width="80"
                        height="40"
                        alt={`${name} flag`}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{nativeName}</td>
                    <td>{population}</td>
                    <td>{region}</td>
                  </tr>
                )
              )
            : null}
        </tbody>
      </table>
      <Backdrop open={loading} style={{color:'white',zIndex:4}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
