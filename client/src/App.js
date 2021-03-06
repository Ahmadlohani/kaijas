import "./App.css";
import { useState } from "react";
import Axios from "axios";
import React from "react";
import { ReactComponent as Logo } from "./assets/logga.svg";
import { ReactComponent as Kaija } from "./assets/kaija.svg";
import { ReactComponent as Salong } from "./assets/storgatan-44.svg";
import { ReactComponent as Stage } from "./assets/Kaijas-scen-01.svg";

function App() {
  ////ARTISTS LOGIN INFO
  // const [login, setLogin] = useState("");

  ///////////CONCERT UPLOAD
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  ////// CONCERT DISPLAY
  const [artistsList, setArtistsList] = useState([]);

  ////////BOOKING CONCERT

  const [bookingName, setBookingName] = useState("");
  const [bookingMail, setBookingMail] = useState("");
  const [bookingTel, setBookingTel] = useState("");
  const [bookingEat, setBookingEat] = useState("");
  const [bookingAmount, setBookingAmount] = useState("");

  ////////ARTIST REQUEST
  const [bandName, setBandName] = useState("");
  const [bandContact, setBandContact] = useState("");
  const [bandMail, setBandMail] = useState("");
  const [bandTel, setBandTel] = useState("");
  const [bandGenre, setBandGenre] = useState("");
  const [bandLink, setBandLink] = useState("");
  const [bandDesc, setBandDesc] = useState("");

  ////////COSTUMER SIGNUP
  const [costumerName, setCostumerName] = useState("");
  const [costumerMail, setCostumerMail] = useState("");
  const [costumerPhone, setCostumerPhone] = useState("");
  const [costumerInterest, setCostumerInterest] = useState("");

  const inputLoginUser = document.querySelector(".login__input--user");
  const inputLoginPin = document.querySelector(".login__input--pin");
  const welcome = document.querySelector(".welcome");
  const errorMsg = document.querySelector(".err__msg");
  const inputPopUp = document.querySelector(".input__pop--up");
  const artistNameInput = document.querySelector(".input__artist--name");
  const artistGenreInput = document.querySelector(".input__artist--genre");
  const artistPriceInput = document.querySelector(".input__artist--price");
  const artistDateInput = document.querySelector(".input__artist--date");
  const artistTimeInput = document.querySelector(".input__artist--time");
  const artistDescInput = document.querySelector(".input__artist--desc");
  const overlay = document.querySelector(".overlay");

  /*-------------LOG IN ARTIST--------------*/
  // const getLoginInfo = () => {
  //   Axios.get("http://localhost:3001/getLoginInfo").then((response) => {
  //     setLogin(response.data);
  //     console.log(response.data);
  //   });
  // };

  function displayArtistInput(e) {
    e.preventDefault();
    const account = {
      email: "info@kaijasalong.com",
      pin: 1234,
    };

    if (pwd == account.pin && user == account.email) {
      inputPopUp.classList.remove("hidden");
      overlay.classList.remove("hidden");
      inputLoginPin.value = "";
      inputLoginUser.value = "";
      setUser("-");
      setPwd("-");
      overlay.addEventListener("click", hideAndClearArtistInput);
    } else {
      errorMsg.classList.remove("hidden");
      welcome.classList.add("hidden");
      inputLoginPin.value = "";
      inputLoginUser.value = "";
      setUser("");
      setPwd("");

      setTimeout(() => {
        errorMsg.classList.add("hidden");
        welcome.classList.remove("hidden");
      }, 2000);
    }
  }

  const hideAndClearArtistInput = (e) => {
    inputPopUp.classList.add("hidden");
    overlay.classList.add("hidden");
    artistNameInput.value = "";
    artistGenreInput.value = "";
    artistPriceInput.value = "";
    artistDateInput.value = "";
    artistTimeInput.value = "";
    artistDescInput.value = "";
    setName("");
    setGenre("");
    setPrice("");
    setDate("");
    setTime("");
    setDesc("");
  };

  /*---------------ADDING CONCERT TO DB-----------*/
  const addArtist = () => {
    Axios.post("http://localhost:3001/uploadArtist", {
      name: name,
      genre: genre,
      price: price,
      date: date,
      time: time,
      desc: desc,
    }).then(() => {
      alert('Din spelning ??r uppladad. G?? till "p?? scen" och se den :');
      hideAndClearArtistInput();
    });
  };

  /*---------------SET CONCERT FROM DB TO USESTATE-----------*/

  const getConcert = () => {
    Axios.get("http://localhost:3001/getConcert").then((response) => {
      setArtistsList(response.data);
    });
  };

  /*---------------ADDING BAND-REQUEST TO DB-----------*/

  const addBand = () => {
    Axios.post("http://localhost:3001/uploadBand", {
      bandName: bandName,
      bandContact: bandContact,
      bandMail: bandMail,
      bandTel: bandTel,
      bandGenre: bandGenre,
      bandLink: bandLink,
      bandDesc: bandDesc,
    }).then(() => {
      alert(
        "Tack f??r all din info! Vi kikar igenom och h??r av oss inom kort! :)"
      );
    });
  };

  /*---------------ADDING KAIJAS-FRIENDS TO DB-----------*/

  const addCostumer = () => {
    Axios.post("http://localhost:3001/uploadCostumer", {
      costumerName: costumerName,
      costumerMail: costumerMail,
      costumerPhone: costumerPhone,
      costumerInterest: costumerInterest,
    }).then(() => {
      alert(
        "Du ??r registrerad! H??ll utkik i inkorgen f??r sp??nnande nyheter :)"
      );
    });
  };

  /*---------------MENU BAR LOGICS-----------*/

  const tabsToggle = (e) => {
    const tabs = document.querySelectorAll(".op__tab");
    const tabsContent = document.querySelectorAll(".op__content");
    const clicked = e.target.closest(".op__tab");

    if (clicked.dataset.tab == 2) getConcert();

    if (!clicked) return;

    tabs.forEach((t) => t.classList.remove("op__tab--active"));
    tabsContent.forEach((c) => c.classList.remove("op__content--active"));

    clicked.classList.add("op__tab--active");

    document
      .querySelector(`.op__content--${clicked.dataset.tab}`)
      .classList.add("op__content--active");
  };

  /*---------------BOOKING-----------*/

  const revielBooking = (el, id) => {
    const artistContainer = document.querySelector(
      `.artists__container--${id}`
    );
    const bookingDiv = document.querySelector(`.booking__div--${id}`);
    const bookingInputFields = document.querySelectorAll(".booking__input");

    bookingDiv.classList.remove("hidden");
    overlay.classList.remove("hidden");

    const close = document.querySelector(`.artists__box--close--${id}`);
    const closeAndClear = () => {
      bookingDiv.classList.add("hidden");
      overlay.classList.add("hidden");
      bookingInputFields.forEach((e) => (e.value = ""));

      setBookingAmount("");
      setBookingName("");
      setBookingEat("");
      setBookingMail("");
      setBookingTel("");
    };

    close.addEventListener("click", function (e) {
      e.preventDefault();
      closeAndClear();
    });
    overlay.addEventListener("click", function (e) {
      e.preventDefault();
      closeAndClear();
    });
  };

  const book = (val) => {
    Axios.post("http://localhost:3001/uploadBooking", {
      guestsName: bookingName,
      guestsMail: bookingMail,
      guestsTel: bookingTel,
      eat: bookingEat,
      amount: bookingAmount,
      bookingEventId: val.artists_id,
      bookingEventName: val.artists_name,
      bookingEventDate: val.artists_date,
      bookingEventTime: val.artists_time,
      totalPrice: val.artists_price * bookingAmount,
    }).then(() => {
      alert("Du har bokat!");
    });
  };
  const updateConcert = (concertId, maxGuests) => {
    const updateCapacity = maxGuests - bookingAmount;
    Axios.post("http://localhost:3001/updateConcert", {
      id: concertId,
      capacity: updateCapacity,
    }).then(() => {
      console.log("Successfully upodated concert table");
    });
  };

  return (
    <div className="App">
      <div className="header__logo">
        <Logo
          className="logo"
          onClick={(event) => (window.location.href = "/")}
        />
      </div>
      <div className="header">
        <nav>
          <ul className="menu__list">
            <li>
              <button
                onClick={tabsToggle}
                className="menu__item--btn op__tab op__tab--1 about"
                data-tab="1"
              >
                Om Kaijas
              </button>
            </li>
            <li>
              <button
                onClick={tabsToggle}
                className="menu__item--btn op__tab op__tab--2 stage"
                data-tab="2"
              >
                P?? Scen
              </button>
            </li>
            <li>
              <button
                onClick={tabsToggle}
                className="menu__item--btn op__tab op__tab--3 food"
                data-tab="3"
              >
                Mat & dryck
              </button>
            </li>
            <li>
              <button
                onClick={tabsToggle}
                className="menu__item--btn op__tab ob__tab--4 contact"
                data-tab="4"
              >
                Kontakt
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="food__kaija op__content op__content--0 op__content--active">
        <Salong />
      </div>
      <div className="about__kaija op__content op__content--1">
        <Kaija className="kaija__image" />
        <h2>Farmor Kaija 1964 - 2021</h2>
        <p>
          <strong>"Men det ??r ju som i Wein eller Paris!", </strong> utbrast jag
          glatt n??r vi m??ttes f??r f??rsta g??ngen. Jag satte mig vid pianot och
          sj??ng en finsk tango. Jag blev kvar i 25 ??r.
        </p>
        <p>
          Kaija f??ddes 1946 i byn Paakkila, sju mil fr??n Kuopio i ??stra Finland.
          F??r??ldrarna Kyllikki och Veikko drev jordbruk i Ohtaanniemi och fick
          fem d??ttrar. Hela familjen spelade och sj??ng. Efter ett par ??r av
          str??jobb gick flytten ??? som f??r m??nga finl??ndare ??? till Sverige. Kaija
          arbetade inom skola, barn- och ??ldreomsorg. Med ??ren kom ??ven tre av
          hennes systrar hit.
        </p>
        <p>
          1972 knackade den r??stbeg??vade symaskinsf??rs??ljaren Erkki Suovanen p??
          d??rren. Sicksack blev till ??kta raks??m och 1974 f??ddes sonen Gabriel,
          som blev ber??md operas??ngare och dottern Hilda 1983, som ??r musiker.
        </p>
        <p>
          ??r 1995 f??rverkligade Kaija sin stora livsdr??m och ??ppnade en
          musiksalong. Samma ??r som Kaija l??mnade oss var det 25-??rsjubileum.
          K??nda och ok??nda fick framtr??da och Kaija bredde sm??rg??sar och
          serverade kaffe i porslinskoppar p?? silverbricka. Under
          kristallkronor, lampetter och fotografier m??nade hon om sina bes??kare
          och stamg??ster. Via en v??ggfast telefon i k??ket hanterades
          biljettbokningarna och all betalning skedde kontant ??ver disk.
          Sondottern Saga tar nu ??ver verksamheten i farmors anda ??? v??lf??rsedd
          med blipp och swish.
        </p>
        <p>
          "Kaija spred en harmonisk trivsel omkring sig och salongen blev en
          m??tesplats f??r de som g??rna i ett nu dr??jer kvar i ett d??. Kaija gav
          rum ??t musiken, dikten och de stora k??nslorna med smak och sin kloka
          eftertanke. Bland Stockholms alla formst??pta kaf??kedjor framst??r
          Kaijas musiksalong i dag som ett unikum."
        </p>
        <p>
          <strong>-S??ngare, estrad??r och v??n, Mattias Enn</strong>
        </p>
        <p>
          Den 12 mars 2022, p?? farmor Kaijas f??delsedag, ??ppnade den
          nyrenoverade musiksalongen som vinbar. Med den franska stj??rnkocken
          Louis Cespedes som konceptansvarig och barnbarnet Saga Suovanen som
          ??garinna v??lkomnar vi den som vill uppleva musiken n??rmre, med en
          fr??jd i glaset och i goda v??nners lag. V??lkomna till Kaijas, Sveriges
          minsta live-scen!
        </p>
      </div>
      <div className="stage__kaija op__content op__content--2">
        <Stage className="kaijas__stage" />
        {artistsList.map((val, key) => {
          const name = val.artists_name;
          const genre = val.artists_genre;
          const price = val.artists_price;
          const month = val.artists_date.slice(5, 7);
          const day = val.artists_date.slice(8, 10);
          const time = val.artists_time;
          const desc = val.artists_desc;
          const id = val.artists_id;
          const available = val.max_guests;
          return (
            <div key={id} className="artists__body">
              <div className={`artists__container artists__container--${id}`}>
                <h1>{name}</h1>
                <p>
                  <span role="img">????</span> {genre}
                </p>
                <p>
                  <span role="img">????</span> {day}/{month}
                  <span role="img"> ???</span> {time}
                </p>
                <p>
                  <span role="img">????</span> {price}kr
                </p>
                <p className="artists__desc">{desc}</p>
                <button
                  className={`artists--btn boka--btn btn__id--${id}`}
                  onClick={(event) => {
                    revielBooking(event.target, id);
                  }}
                >
                  Boka
                </button>
              </div>

              <div className={`booking__div booking__div--${id} hidden`}>
                <a className={`artists__close__box artists__box--close--${id}`}>
                  X
                </a>
                <h1>
                  Boka: {name}!{" "}
                  <span className="party__emojy" role="img">
                    ????
                  </span>
                </h1>
                <p>
                  Just nu finns det <strong>{available}</strong> platser kvar,
                  hur m??nga platser vill du boka? Ange h??r:{" "}
                  <select
                    className={`booking__input booking__input--amount${id}`}
                    name="amount"
                    onChange={(event) => {
                      setBookingAmount(event.target.value);
                    }}
                  >
                    <option value="-">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>{" "}
                </p>
                <p>
                  I vilket{" "}
                  <input
                    className={`booking__input booking__input--name${id}`}
                    type="text"
                    name="bookingName"
                    placeholder="F??r- & efternamn"
                    width="70px"
                    onChange={(event) => {
                      setBookingName(event.target.value);
                    }}
                  />{" "}
                  vill {bookingAmount > 1 ? "ni" : "du"} boka i?
                </p>
                <p>
                  Vill {bookingAmount > 1 ? "ni" : "du"} ??ta i samband med
                  konserten?{" "}
                  <select
                    className={`booking__input booking__input--eat${id}`}
                    onChange={(event) => {
                      setBookingEat(event.target.value);
                    }}
                  >
                    <option value="-">-</option>
                    <option value="Ja">Ja</option>
                    <option value="Nej">Nej</option>
                  </select>
                </p>
                <p>
                  {bookingEat === "Nej" ||
                  bookingEat === "-" ||
                  bookingEat === ""
                    ? ""
                    : `Vad kul ${bookingName.split(" ")[0]}, att ${
                        bookingAmount > 1 ? "ni" : "du"
                      } vill ??ta! F??r att vi ska kunna garantera s?? bra service som m??jligt ber vi  ${
                        bookingAmount > 1 ? "er" : "dig"
                      } att anl??nda senast 1 timme/45 min innan spelningen b??rjar. Vid senare ankomst kan vi inte garantera att ni f??r maten i samband med musiken och serverar i s?? fall efter??t.`}
                </p>
                <p>
                  Vart ska vi skicka bekr??ftelsen?{" "}
                  <input
                    className={`booking__input booking__input--mail${id}`}
                    type="email"
                    name="bookingMail"
                    placeholder="Bokare@mail.com"
                    onChange={(event) => {
                      setBookingMail(event.target.value);
                    }}
                  />
                </p>
                <p>
                  Vilket nummer kan vi n?? dig p???{" "}
                  <input
                    className={`booking__input booking__input--tel${id}`}
                    type="text"
                    name="bookingTel"
                    placeholder="0707070707"
                    onChange={(event) => {
                      setBookingTel(event.target.value);
                    }}
                  />
                </p>
                <p>
                  {bookingAmount > 1 ? "Er" : "Din"} total:{" "}
                  <strong>{price * bookingAmount} kr</strong>. Biljettpriset
                  l??ggs p?? notan f??r kv??llen.
                </p>
                <button
                  className={`comfirm__booking--btn comfirm__booking--btn--${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      !bookingAmount &&
                      !bookingName &&
                      !bookingEat &&
                      !bookingMail &&
                      !bookingTel
                    ) {
                      return;
                    }
                    if (
                      !bookingAmount ||
                      !bookingName ||
                      !bookingEat ||
                      !bookingMail ||
                      !bookingTel
                    ) {
                      alert("Fyll i alla f??lt");
                      return;
                    }
                    if (bookingAmount === "-" || bookingEat === "-") {
                      alert("Var god ange giltiga alternativ");
                      return;
                    }
                    if (bookingTel.length !== 10) {
                      alert("Fyll i giltigt, 10-siffrigt telefonnummer");
                      return;
                    }
                    if (bookingAmount < available) {
                      console.log(bookingAmount, available);
                      alert("Det finns inte tillr??ckligt m??nga platser kvar.");
                      return;
                    }
                    book(val);
                    updateConcert(id, available);
                    window.location.reload(false);
                  }}
                >
                  Boka
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="food__kaija op__content op__content--3">
        <h2>Food @ Kaijas Page</h2>
        <p>This is something!</p>
      </div>
      <div className="contact__kaija op__content op__content--4">
        <div className="">
          <h2>Kontakta oss</h2>
          <p>
            <strong>Abonnera</strong>
          </p>
          <p>
            Det g??r att abonnera v??r lokal! I en unik milj?? med inredning som
            p??minner om b??rjan av 1900-talets Paris skr??ddarsyr vi kv??llen efter
            era behov. P.S, ??nskar ni levande musik g??r det sj??lvklart att
            ordna.
          </p>
          <a href="mailto:info@kaijasalong.com">info@kaijasalong.com</a>
          <p>
            <strong>Bordsbokning eller st??rre s??llskap</strong>
          </p>
          <p>Vid bordsbokning eller andra fr??gor inf??r ert bes??k.</p>
          <a>bokabord@kaijasalong.com</a>
          <br />
          <a href="tel:073-4233504">073-423 35 04</a>
          <div className="costumer__form--container">
            <p>
              <strong>
                ??r du artist och vill spela hos oss, p?? Sveriges minsta
                livescen?
              </strong>
            </p>
            <p>
              Klicka p?? knappen nedan och fyll i uppgifterna, s?? ??terkommer vi
              f??r mer detaljer.
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                const formDiv = document.querySelector(".band__form--div");
                const overlay = document.querySelector(".overlay");
                formDiv.classList.remove("hidden");
                overlay.classList.remove("hidden");

                overlay.addEventListener("click", function (e) {
                  e.preventDefault();
                  overlay.classList.add("hidden");
                  formDiv.classList.add("hidden");
                });
              }}
            >
              Klicka h??r!
            </button>
            <div className="band__form--div hidden">
              <form className="band__form">
                <input
                  type="text"
                  name="bandName"
                  placeholder="Bandets Namn"
                  onChange={(event) => {
                    setBandName(event.target.value);
                  }}
                />
                <input
                  type="text"
                  name="bandContact"
                  placeholder="Kontaktperson"
                  onChange={(event) => {
                    setBandContact(event.target.value);
                  }}
                />

                <input
                  type="email"
                  name="bandMail"
                  placeholder="Mail"
                  onChange={(event) => {
                    setBandMail(event.target.value);
                  }}
                />
                <input
                  type="tel"
                  name="bandNumber"
                  placeholder="Tel"
                  onChange={(event) => {
                    setBandTel(event.target.value);
                  }}
                />
                <input
                  type="text"
                  name="bandGenre"
                  placeholder="Genre/genres"
                  onChange={(event) => {
                    setBandGenre(event.target.value);
                  }}
                />
                <input
                  type="text"
                  name="bandLink-1"
                  placeholder="L??nk till l??t/upptr.."
                  onChange={(event) => {
                    setBandLink(event.target.value);
                  }}
                />
                <textarea
                  className="bandDesc"
                  name="bandDesc"
                  placeholder="Beskriv er kort f??r oss..."
                  maxLength={"600"}
                  onChange={(event) => {
                    setBandDesc(event.target.value);
                  }}
                />

                <button
                  type="submit"
                  className="band--btn"
                  name="bandButton"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      !bandName &&
                      !bandContact &&
                      !bandMail &&
                      !bandTel &&
                      !bandGenre &&
                      !bandLink &&
                      !bandDesc
                    ) {
                      return;
                    }
                    if (
                      !bandName ||
                      !bandContact ||
                      !bandMail ||
                      !bandTel ||
                      !bandGenre ||
                      !bandLink ||
                      !bandDesc
                    ) {
                      alert("Fyll I alla f??lt");
                      return;
                    }
                    addBand();
                  }}
                >
                  Skicka f??rfr??gan
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="costumer__form--container">
          <h2>Bli en del av Kaijas-v??nner!</h2>
          <p>
            Som Kaijas-v??n ??r du f??rst att f?? reda p?? alla sp??nnande nyheter hos
            oss. Allt fr??n uppdatering av vinlistan och nyheter p?? menyn, till
            f??rk??p av popul??ra konserter och events. Det ??r sj??lvklart gratis
            att vara v??n!
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              const formDiv = document.querySelector(".costumer__form--div");
              const overlay = document.querySelector(".overlay");
              formDiv.classList.remove("hidden");
              overlay.classList.remove("hidden");

              overlay.addEventListener("click", function (e) {
                e.preventDefault();
                overlay.classList.add("hidden");
                formDiv.classList.add("hidden");
              });
            }}
          >
            Bli v??n!
          </button>
          <div className="costumer__form--div hidden">
            <form className="costumer__form">
              <input
                type="text"
                name="costumerName"
                placeholder="F??r- & efternamn.."
                onChange={(event) => {
                  setCostumerName(event.target.value);
                }}
              />
              <input
                type="email"
                name="costumerMail"
                placeholder="Mail"
                onChange={(event) => {
                  setCostumerMail(event.target.value);
                }}
              />
              <input
                type="tel"
                name="costumerNumber"
                placeholder="Tel"
                onChange={(event) => {
                  setCostumerPhone(event.target.value);
                }}
              />
              <textarea
                type="text"
                name="costumerGenre"
                placeholder="Intresserad av"
                onChange={(event) => {
                  setCostumerInterest(event.target.value);
                }}
              />
              <button
                type="submit"
                name="costumerButton"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    !costumerName &&
                    !costumerMail &&
                    !costumerInterest &&
                    !costumerPhone
                  ) {
                    return;
                  }
                  if (!costumerName || !costumerMail || !costumerInterest) {
                    alert("Fyll i nog med f??lt s?? vi kan kontakta er!");
                    return;
                  }
                  addCostumer();
                }}
              >
                Bli v??n!
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="input__pop--up hidden">
          <div className="artists__input--form">
            <button
              className="close__input--btn"
              onClick={hideAndClearArtistInput}
            >
              X
            </button>
            <div className="artist__box">
              <input
                type="text"
                name="name"
                placeholder="Bandets namn"
                className="input__artist--name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <input
                type="text"
                name="genre"
                placeholder="Genre"
                className="input__artist--genre"
                onChange={(event) => {
                  setGenre(event.target.value);
                }}
              />
              <input
                type="text"
                name="price"
                className="input__artist--price"
                placeholder="Biljettpris"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <input
                type="date"
                name="date"
                className="input__artist--date"
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
              <input
                type="time"
                name="time"
                className="input__artist--time"
                onChange={(event) => {
                  setTime(event.target.value);
                }}
              />
              <textarea
                type="text"
                name="desc"
                className="input__artist--desc"
                maxLength={"600"}
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
              ></textarea>
              <div className="btn__container">
                <button className="artists--btn" onClick={addArtist}>
                  Ladda upp
                </button>
              </div>
            </div>

            <div className="artists__container">
              <h1>{name}</h1>
              <p>
                <span role="img">????</span> {genre}
              </p>
              <p>
                <span role="img">????</span> {date.slice(8, 10)}/{date.slice(5, 7)}
                <span role="img"> ???</span> {time}
              </p>
              <p>
                <span role="img">????</span> {price} kr
              </p>

              <p className="artists__desc">{desc}</p>
            </div>
          </div>
        </div>
        <a>Storgatan 44</a>
        <a>114 55 Stockholm</a>
        <p>
          ?? 2022 Kaijas Salong AB, <a>559335-9077</a>
        </p>

        <div className="login__container">
          <nav>
            <p className="welcome">Artist? Logga in h??r</p>
            <p className="err__msg hidden">Fel inlogg..</p>
            <form className="login">
              <input
                type="text"
                name="user"
                placeholder="Email.."
                className="login__input login__input--user"
                onChange={(event) => {
                  setUser(event.target.value);
                }}
              />
              <input
                type="password"
                name="pwd"
                placeholder="PIN.."
                className="login__input login__input--pin"
                onChange={(event) => {
                  setPwd(event.target.value);
                }}
              />
              <button
                className="login__btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (!pwd || !user) return;
                  displayArtistInput(e);
                }}
              >
                &rarr;
              </button>
            </form>
          </nav>
        </div>
        <div className="overlay hidden"></div>
      </div>
    </div>
  );
}

export default App;
