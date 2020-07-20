export default {
  form: {
    status: {
      person: {
        pl: "Osoba fizyczna",
        en: "Person",
      },
      company: {
        pl: "Firma",
        en: "Company",
      },
      label: {
        pl: "Wybierz swój status",
        en: "Select your status",
      },
    },
    pesel: {
      e: {
        required: empty,
        pattern: {
          pl: digits(11).pl,
          en: digits(11).en,
        },
      },
    },
    sex: {
      label: {
        pl: "Płeć",
        en: "Sex",
      },
      placeholder: {
        pl: "mężczyzna/kobieta",
        en: "male/female",
      },
    },
    birth: {
      label: {
        pl: "Data urodzenia",
        en: "Date of birth",
      },
    },
    nip: {
      e: {
        required: empty,
        pattern: digits(10),
      },
    },
    company: {
      label: {
        pl: "Nazwa firmy",
        en: "Company name",
      },
    },
    firstName: {
      label: { pl: "Imię", en: "First name" },
      e: {
        required: empty,
        pattern: char(3),
      },
    },
    lastName: {
      label: { pl: "Nazwisko", en: "Last name" },
      e: {
        required: empty,
        pattern: char(3),
      },
    },
    city: {
      label: { pl: "Miasto", en: "City name" },
      e: {
        required: empty,
        pattern: char(3),
      },
    },
    street: {
      label: {
        pl: "Ulica",
        en: "Street",
      },
      e: {
        required: empty,
        pattern: char(3),
      },
    },
    codeAddress: {
      label: {
        pl: "Kod pocztowy",
        en: "Code Address",
      },
      e: {
        required: empty,
        pattern: {
          pl: "Wzór musi być typu 00-000",
          en: "Only pattern like 00-000",
        },
      },
    },
    bank: {
      label: {
        pl: "Number konta bankowego",
        en: "Account Number",
      },
      e: {
        required: empty,
        pattern: digits(26),
        validate: {
          pl: "Podany numer nie istnieje",
          en: "This number not exist",
        },
      },
    },
  },
};
/*
{
  pl:"",
  en:""
}
*/
