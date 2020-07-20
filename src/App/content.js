import React from "react";
import Github from "../components/pages/search";
import Forms from "../components/pages/forms";
import Charts from "../components/pages/charts";
import Images from "../components/pages/images";
import Table from "../components/pages/table";
import Login from "../components/pages/login";
export default {
  pageNot: {
    pl: "Nie znaleziono strony",
    en: "Page not found",
  },
  backButton: {
    pl: "Wróć",
    en: "Back",
  },
  routing: [
    {
      title: {
        pl: "Wykresy",
        en: "Charts",
      },
      component: <Charts />,
    },
    {
      title: {
        pl: "Formularze",
        en: "Forms",
      },
      component: <Forms />,
    },
    {
      title: {
        pl: "Logowanie",
        en: "Login",
      },
      component: <Login />,
    },
    {
      title: {
        pl: "Wyszukiwarka",
        en: "Searcher",
      },
      component: <Github />,
    },
    {
      title: {
        pl: "Tabela",
        en: "Table",
      },
      component: <Table />,
    },
    {
      title: {
        pl: "Zdjęcia",
        en: "Images",
      },
      component: <Images />,
    },
  ],
};
/*
{
  pl:"",
  en:""
}
*/
