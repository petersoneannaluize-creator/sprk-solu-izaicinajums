import React, { useEffect, useState } from "react";
import "./style.css";
import sprkLogo from "./sprk25-logo.png";
import journeyImage from "./sprk-celojums.png";

const GOAL = 25000000;
const DATA_URL = "/data.json";
const submitFormUrl = "https://forms.office.com/";

const checkpoints = [
  { steps: 50000, icon: "walk", title: "Pirmie 50 (tūkstoši) – jubilejas starts" },
  { steps: 500000, icon: "latvia", title: "Apiets apkārt Latvijai" },
  { steps: 1000000, icon: "river", title: "Noieta Daugava visā tās garumā" },
  { steps: 2000000, icon: "shell", title: "Noiets Camino de Santiago" },
  { steps: 3000000, icon: "wall", title: "Noiets Ķīnas mūris" },
  { steps: 7000000, icon: "anchor", title: "Apiets apkārt Baltijas jūrai" },
  { steps: 12000000, icon: "eu", title: "Apiets apkārt Eiropai" },
  { steps: 15000000, icon: "desert", title: "Noieta Nīla visā tās garumā" },
  { steps: 20000000, icon: "mountain", title: "Šķērsota Eirāzija" },
  { steps: 25000000, icon: "globe", title: "Nostaigāta gandrīz puse pasaules" },
];

const employees = [
  { name: "Agita Unska-Lapiņa", steps: 0 },
  { name: "Aiga Kariņa", steps: 0 },
  { name: "Aiga Lipenberga", steps: 0 },
  { name: "Aigars Mežals", steps: 0 },
  { name: "Aija Svikle", steps: 0 },
  { name: "Aiva Dreija", steps: 0 },
  { name: "Aivis Reinholds", steps: 0 },
  { name: "Alda Ozola", steps: 0 },
  { name: "Alnis Garkājis", steps: 0 },
  { name: "Anda Done", steps: 0 },
  { name: "Andrejs Dombrovskis", steps: 0 },
  { name: "Andrejs Jakovļevs", steps: 0 },
  { name: "Andrejs Lizunovs", steps: 0 },
  { name: "Andrievs Mukāns", steps: 0 },
  { name: "Andris Beļajevs", steps: 0 },
  { name: "Anna Luīze Pētersone", steps: 0 },
  { name: "Anna Pelša", steps: 0 },
  { name: "Anna Upena", steps: 0 },
  { name: "Anta Ellere-Feodorova", steps: 0 },
  { name: "Artis Zverovs", steps: 0 },
  { name: "Artūrs Tamanis", steps: 0 },
  { name: "Astra Breikša", steps: 0 },
  { name: "Baiba Mudele", steps: 0 },
  { name: "Baiba Pope-Veisa", steps: 0 },
  { name: "Bruno Radziņš", steps: 0 },
  { name: "Dace Bite", steps: 0 },
  { name: "Dace Burtniece", steps: 0 },
  { name: "Dace Kalniņa", steps: 0 },
  { name: "Dace Čodare-Plaude", steps: 0 },
  { name: "Dace Āboliņa", steps: 0 },
  { name: "Dana Radionova", steps: 0 },
  { name: "Dainis Jaševs", steps: 0 },
  { name: "Diāna Bērziņa", steps: 0 },
  { name: "Diāna Kibelko-Garbuzova", steps: 0 },
  { name: "Diāna Neimane", steps: 0 },
  { name: "Didzis Šapkus", steps: 0 },
  { name: "Dita Jansone", steps: 0 },
  { name: "Džeina Šteinberga", steps: 0 },
  { name: "Edīte Bieļa-Dailidoviča", steps: 0 },
  { name: "Edmunds Bieļa", steps: 0 },
  { name: "Edmunds Rudzītis", steps: 0 },
  { name: "Elita Grante", steps: 0 },
  { name: "Elmārs Lipenbergs", steps: 0 },
  { name: "Elza Bergmane", steps: 0 },
  { name: "Evita Ambaine", steps: 0 },
  { name: "Evita Biezmane", steps: 0 },
  { name: "Fricis Rūmnieks", steps: 0 },
  { name: "Ginta Jakoviča", steps: 0 },
  { name: "Ginta Sece", steps: 0 },
  { name: "Gunta Frēze", steps: 0 },
  { name: "Ieva Blaumane", steps: 0 },
  { name: "Ieva Feldmane", steps: 0 },
  { name: "Ieva Lezdiņa", steps: 0 },
  { name: "Ieva Rozentāle", steps: 0 },
  { name: "Ilze Birzniece", steps: 0 },
  { name: "Ilze Moora", steps: 0 },
  { name: "Ilze Tarvāne", steps: 0 },
  { name: "Imants Mantiņš", steps: 0 },
  { name: "Inese Vēvere", steps: 0 },
  { name: "Ineta Bērziņa", steps: 0 },
  { name: "Inga Balabkina", steps: 0 },
  { name: "Inga Vagale", steps: 0 },
  { name: "Ingus Užulis", steps: 0 },
  { name: "Intars Birziņš", steps: 0 },
  { name: "Irēna Razumļova", steps: 0 },
  { name: "Ivars Tauniņš", steps: 0 },
  { name: "Jolanta Stelpe", steps: 0 },
  { name: "Jeļena Tripane", steps: 0 },
  { name: "Juris Ķezberis", steps: 0 },
  { name: "Jānis Brakovskis", steps: 0 },
  { name: "Jānis Ikaunieks", steps: 0 },
  { name: "Jānis Lavicevičs", steps: 0 },
  { name: "Jānis Miķelsons", steps: 0 },
  { name: "Jānis Negribs", steps: 0 },
  { name: "Jūlija Šaripova", steps: 0 },
  { name: "Kristīne Breikša", steps: 0 },
  { name: "Kristīne Strautmane-Grābēja", steps: 0 },
  { name: "Kārlis Barančans", steps: 0 },
  { name: "Lauma Kasparsone", steps: 0 },
  { name: "Liene Rasa", steps: 0 },
  { name: "Lija Makare", steps: 0 },
  { name: "Lilija Gadzāne", steps: 0 },
  { name: "Linda Paršova", steps: 0 },
  { name: "Linda Ziņģe", steps: 0 },
  { name: "Līga Lamba", steps: 0 },
  { name: "Līga Novada", steps: 0 },
  { name: "Līga Svaža", steps: 0 },
  { name: "Līga Vitenberga", steps: 0 },
  { name: "Līga Vēja", steps: 0 },
  { name: "Marina Sņetkova", steps: 0 },
  { name: "Maruta Purviņa", steps: 0 },
  { name: "Māris Sirmais", steps: 0 },
  { name: "Mikus Matisons", steps: 0 },
  { name: "Nataliia Lado", steps: 0 },
  { name: "Nellija Briede", steps: 0 },
  { name: "Pēteris Leiškalns", steps: 0 },
  { name: "Pēteris Rezevskis", steps: 0 },
  { name: "Reinis Āboltiņš", steps: 0 },
  { name: "Rota Šņuka", steps: 0 },
  { name: "Sandra Bimbere", steps: 0 },
  { name: "Sandra Briede", steps: 0 },
  { name: "Sandija Varnovska", steps: 0 },
  { name: "Santa Kaļva", steps: 0 },
  { name: "Sigita Tukiša", steps: 0 },
  { name: "Sindija Dzene", steps: 0 },
  { name: "Svetlana Vītola", steps: 0 },
  { name: "Uldis Mosāns", steps: 0 },
  { name: "Uldis Vīlips", steps: 0 },
  { name: "Valts Šulcs", steps: 0 },
  { name: "Viesturs Kadiķis", steps: 0 },
  { name: "Vineta Biseniece", steps: 0 },
  { name: "Vija Studente", steps: 0 },
  { name: "Vjačeslavs Smirnovs", steps: 0 },
  { name: "Ēriks Eihenbergs", steps: 0 },
];

function format(n) {
  return new Intl.NumberFormat("lv-LV").format(n);
}

function excelDateToJSDate(serial) {
  const value = Number(serial);
  if (!value) return null;

  const utcDays = Math.floor(value - 25569);
  const utcValue = utcDays * 86400;
  const dateInfo = new Date(utcValue * 1000);

  const fractionalDay = value - Math.floor(value);
  const totalSeconds = Math.floor(86400 * fractionalDay);

  dateInfo.setSeconds(totalSeconds);
  return dateInfo;
}

function getWeekKey(date) {
  if (!date) return "";

  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);

  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

  return `${d.getUTCFullYear()}-${String(weekNo).padStart(2, "0")}`;
}

function cleanSteps(value) {
  return Number(String(value || "0").replace(/\s/g, "").replace(",", ".")) || 0;
}

function pluralParticipants(count) {
  return count === 1 ? "dalībnieks" : "dalībnieki";
}

function CheckpointIcon({ checkpoint }) {
  switch (checkpoint.icon) {
    case "latvia":
      return <LatviaFlagIcon />;
    case "eu":
      return <EUFlagIcon />;
    case "walk":
      return <span className="emojiIcon">🚶</span>;
    case "river":
      return <span className="emojiIcon">🌊</span>;
    case "shell":
      return <span className="emojiIcon">🐚</span>;
    case "wall":
      return <span className="emojiIcon">🧱</span>;
    case "anchor":
      return <span className="emojiIcon">⚓</span>;
    case "desert":
      return <span className="emojiIcon">🏜️</span>;
    case "mountain":
      return <span className="emojiIcon">🏔️</span>;
    case "globe":
      return <span className="emojiIcon">🌍</span>;
    default:
      return <span className="emojiIcon">📍</span>;
  }
}

function LatviaFlagIcon() {
  return (
    <span className="flagIcon" aria-label="Latvijas karogs" title="Latvija">
      <svg viewBox="0 0 36 24" className="flagSvg" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="24" rx="4" fill="#9E3039" />
        <rect y="9" width="36" height="6" fill="#FFFFFF" />
      </svg>
    </span>
  );
}

function EUFlagIcon() {
  const stars = [
    [18, 6],
    [22.5, 7.2],
    [25.8, 10.5],
    [27, 15],
    [25.8, 18.5],
    [22.5, 21],
    [18, 22],
    [13.5, 21],
    [10.2, 18.5],
    [9, 15],
    [10.2, 10.5],
    [13.5, 7.2],
  ];

  return (
    <span className="flagIcon" aria-label="Eiropas Savienības karogs" title="Eiropas Savienība">
      <svg viewBox="0 0 36 24" className="flagSvg" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="24" rx="4" fill="#1E4FA1" />
        {stars.map(([cx, cy], index) => (
          <circle key={index} cx={cx} cy={cy} r="1" fill="#FFD84D" />
        ))}
      </svg>
    </span>
  );
}

export default function App() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => setSubmissions(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Neizdevās ielādēt soļu datus:", error);
        setSubmissions([]);
      });
  }, []);

  const normalizedSubmissions = submissions.map((row) => ({
    name: row.Name || "",
    department: row.Departaments || "",
    steps: cleanSteps(row.Steps),
    date: excelDateToJSDate(row.CompletionTime),
    week: getWeekKey(excelDateToJSDate(row.CompletionTime)),
  }));

  const currentSteps = normalizedSubmissions.reduce((sum, row) => sum + row.steps, 0);

  const walkers = employees
    .map((employee) => {
      const total = normalizedSubmissions
        .filter((row) => row.name === employee.name)
        .reduce((sum, row) => sum + row.steps, 0);

      return {
        name: employee.name,
        steps: total,
      };
    })
    .sort((a, b) => b.steps - a.steps);

  const activeWeeks = [...new Set(normalizedSubmissions.map((row) => row.week).filter(Boolean))].sort();
  const latestWeek = activeWeeks[activeWeeks.length - 1];

  const weeklyTopWalkers = employees
    .map((employee) => {
      const total = normalizedSubmissions
        .filter((row) => row.name === employee.name && row.week === latestWeek)
        .reduce((sum, row) => sum + row.steps, 0);

      return {
        name: employee.name,
        steps: total,
      };
    })
    .filter((row) => row.steps > 0)
    .sort((a, b) => b.steps - a.steps)
    .slice(0, 5);

  const departmentMap = normalizedSubmissions.reduce((acc, row) => {
    if (!row.department) return acc;

    if (!acc[row.department]) {
      acc[row.department] = {
        name: row.department,
        steps: 0,
        participants: new Set(),
      };
    }

    acc[row.department].steps += row.steps;
    if (row.name) acc[row.department].participants.add(row.name);

    return acc;
  }, {});

  const departments = Object.values(departmentMap)
    .map((department) => {
      const participantCount = department.participants.size || 1;

      return {
        name: department.name,
        steps: department.steps,
        participants: participantCount,
        average: Math.round(department.steps / participantCount),
      };
    })
    .sort((a, b) => b.average - a.average);

  const progress = Math.min(100, Math.round((currentSteps / GOAL) * 100));
  const next = checkpoints.find((c) => c.steps > currentSteps) || checkpoints[checkpoints.length - 1];
  const reached = checkpoints.filter((c) => c.steps <= currentSteps).length;
  const participantCount = walkers.filter((w) => w.steps > 0).length;
  const stepsUntilNext = Math.max(0, next.steps - currentSteps);

  const topDepartments = departments.slice(0, 3);
  const otherDepartments = departments.slice(3);
  const maxDepartmentAverage = departments[0]?.average || 1;

  const isProgressEmbed = window.location.pathname === "/progress";
  const isDepartmentsEmbed = window.location.pathname === "/departamenti";

  if (isProgressEmbed) {
    return (
      <ProgressEmbed
        currentSteps={currentSteps}
        goal={GOAL}
        progress={progress}
        next={next}
        stepsUntilNext={stepsUntilNext}
      />
    );
  }

  if (isDepartmentsEmbed) {
    return (
      <DepartmentsEmbed
        topDepartments={topDepartments}
        otherDepartments={otherDepartments}
        maxDepartmentAverage={maxDepartmentAverage}
      />
    );
  }

  return (
    <main>
      <div className="page">
        <nav className="topbar">
          <div className="brand">
            <img src={sprkLogo} alt="SPRK 25" className="sprk-logo" />
          </div>

          <a className="button" href={submitFormUrl} target="_blank" rel="noreferrer">
            Iesniegt soļus
          </a>
        </nav>

        <section className="heroShell">
          <div className="heroText">
            <p className="eyebrow">25 gadi · 25 miljoni soļu</p>
            <h1>Regulatora soļu izaicinājums</h1>

            <p className="lead">
              🎉 Svinot Regulatora 25 gadu jubileju, aicinām visus regulatora darbiniekus pievienoties kopīgam soļu izaicinājumam un mūsu jubilejas gadā kopā noiet 25 miljonus soļu! 👣
            </p>

            <p className="lead smaller">
              Soļus jāiesniedz svētdienā, lai pirmdienās varam atjaunot kopējo progresu, TOP soļotājus un nodaļu reitingu.
            </p>
          </div>

          <div>
            <img src={journeyImage} alt="Ceļojuma progress" className="journey-image" />
          </div>

          <div className="progressPanel clean">
            <div className="progressHeader">
              <div>
                <h2>👣 Šobrīd esam nogājuši {format(currentSteps)} soļu</h2>
                <p>No kopējā mērķa — {format(GOAL)} soļiem</p>
              </div>

              <div className="progressBadge">{progress}%</div>
            </div>

            <div className="progressLine cleanBar">
              <div className="fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="progressMeta">
              <span>0</span>
              <strong>
                {format(currentSteps)} / {format(GOAL)} soļu
              </strong>
              <span>{format(GOAL)}</span>
            </div>
          </div>

          <div className="nextInline">
            <div>
              <p>Nākamais sasniedzamais mērķis</p>
              <h3>
                <CheckpointIcon checkpoint={next} /> {next.title}
              </h3>
            </div>

            <strong>Vēl {format(stepsUntilNext)} soļi</strong>
          </div>

          <div className="checkpointStrip">
            {checkpoints.map((c) => {
              const done = c.steps <= currentSteps;
              const hidden = c.steps > next.steps;

              return (
                <div className={`miniCheckpoint ${done ? "done" : ""} ${hidden ? "mystery" : ""}`} key={c.steps}>
                  {hidden ? (
                    <span className="question">?</span>
                  ) : (
                    <>
                      <div className="cpIcon">
                        <CheckpointIcon checkpoint={c} />
                      </div>
                      <b>{format(c.steps)} soļu</b>
                      <p>{c.title}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="notice">
            <b>Soļu progress tiek atjaunots reizi nedēļā — pirmdienās.</b>
            <span>Aicinām darbiniekus iesūtīt soļu skaitu līdz katras svētdienas beigām.</span>
          </div>

          <div className="heroActions">
            <a className="button" href={submitFormUrl} target="_blank" rel="noreferrer">
              Iesniegt savus soļus →
            </a>
            <a className="button secondary" href="#ka-piedalities">
              Skatīt noteikumus
            </a>
          </div>
        </section>

        <section className="summaryGrid">
          <div className="summaryCard next">
            <p>📍 Nākamais sasniedzamais mērķis</p>
            <div className="nextIcon">
              <CheckpointIcon checkpoint={next} />
            </div>
            <h2>{next.title}</h2>
            <span>Vēl {format(stepsUntilNext)} soļi līdz sasniegšanai</span>
          </div>

          <div className="summaryCard">
            <h2>{participantCount}</h2>
            <p>Piedalās SPRK darbinieku</p>
          </div>

          <div className="summaryCard">
            <h2>
              {reached}/{checkpoints.length}
            </h2>
            <p>Sasniegti checkpointi</p>
          </div>
        </section>

        <section className="contentGrid peopleGrid">
          <div className="card">
            <div className="sectionHeader">
              <div>
                <h2>Kopējais staigātāju reitings</h2>
                <p>Visi iesniegtie soļi kopš izaicinājuma sākuma</p>
              </div>
              <b>Kopā</b>
            </div>

            <div className="ranking fullRanking">
              {walkers.map((w, i) => (
                <Row key={w.name} rank={i + 1} name={w.name} value={format(w.steps)} small />
              ))}
            </div>
          </div>

          <div className="card">
            <div className="sectionHeader">
              <div>
                <h2>Pagājušās nedēļas aktīvākie</h2>
                <p>TOP 5 lielākais iesniegto soļu skaits nedēļā</p>
              </div>
              <b>TOP 5</b>
            </div>

            {weeklyTopWalkers.length > 0 ? (
              weeklyTopWalkers.map((w, i) => (
                <Row key={w.name} rank={i + 1} name={w.name} value={format(w.steps)} />
              ))
            ) : (
              <p className="muted">Pagājušās nedēļas dati vēl nav iesniegti.</p>
            )}
          </div>
        </section>

        <section className="contentGrid departmentGrid">
          <div className="card departmentCard">
            <h2>Nodaļu reitings</h2>
            <p className="muted">
              TOP skaitļi rāda nodaļas vidējo kopējo iesniegto soļu skaitu uz vienu dalībnieku. Aprēķins: nodaļas visi iesniegtie soļi ÷ unikālo dalībnieku skaits.
            </p>

            {topDepartments.length > 0 ? (
              <>
                <div className="departmentExplanation">
                  <b>Kā veidojas TOP?</b>
                  <span>
                    Reitings tiek kārtots pēc rādītāja “vidēji uz dalībnieku”, lai lielākas nodaļas automātiski nebūtu priekšā tikai cilvēku skaita dēļ.
                  </span>
                </div>

                <div className="departmentPodium">
                  {topDepartments.map((d, index) => {
                    const placeClass = index === 0 ? "first" : index === 1 ? "second" : "third";
                    const placeLabel = index === 0 ? "1. vieta" : index === 1 ? "2. vieta" : "3. vieta";
                    const icon = index === 0 ? "🏆" : index === 1 ? "🥾" : "🚶";

                    return (
                      <div className={`podiumCard ${placeClass}`} key={d.name}>
                        <div className="podiumIcon">{icon}</div>

                        <div className="podiumBar">
                          <span>{placeLabel}</span>
                          <b>{format(d.average)}</b>
                          <small>vidēji uz dalībnieku</small>
                        </div>

                        <h3>{d.name}</h3>
                        <p>
                          {format(d.steps)} kopā · {d.participants} {pluralParticipants(d.participants)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {otherDepartments.length > 0 && (
                  <div className="otherDepartments">
                    <h3>Pārējās nodaļas</h3>

                    {otherDepartments.map((d, index) => {
                      const barWidth = Math.max(8, Math.round((d.average / maxDepartmentAverage) * 100));

                      return (
                        <div className="otherDeptRow" key={d.name}>
                          <div className="otherDeptRank">{index + 4}</div>

                          <div className="otherDeptMain">
                            <div className="otherDeptTop">
                              <b>{d.name}</b>
                              <strong>{format(d.average)}</strong>
                            </div>

                            <div className="otherDeptBar">
                              <div style={{ width: `${barWidth}%` }} />
                            </div>

                            <p>
                              {format(d.steps)} kopā · {d.participants} {pluralParticipants(d.participants)} · vidēji uz dalībnieku
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <p className="muted">Nodaļu dati vēl nav iesniegti.</p>
            )}
          </div>
        </section>

        <section className="contentGrid lower instructionsOnly">
          <div className="card instructionCard" id="ka-piedalities">
            <h2>Kā piedalīties un iesniegt savus soļus</h2>

            <div className="stepsGrid">
              <Step n="1" title="Atver savu soļu lietotni" text="Apple Health, Samsung Health, Garmin, Fitbit, Google Fit vai citu lietotni." />
              <Step n="2" title="Pārbaudi nedēļas soļu skaitu" text="Pārliecinies, ka redzi pareizo nedēļas periodu un kopējo soļu skaitu." />
              <Step n="3" title="Aizpildi anketu" text="Ievadi nedēļas soļu skaitu. Organizatori nepieciešamības gadījumā var lūgt precizējošu ekrānšāviņu." />
              <Step n="4" title="Palīdzi sasniegt checkpointus" text="Katrs iesniegtais solis papildina kopējo progresu." />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProgressEmbed({ currentSteps, goal, progress, next, stepsUntilNext }) {
  return (
    <main className="embedPage">
      <section className="embedCard progressEmbed">
        <div className="embedHeader">
          <div>
            <p className="embedEyebrow">SPRK soļu izaicinājums</p>
            <h1>👣 {format(currentSteps)} soļu</h1>
            <p>No kopējā mērķa — {format(goal)} soļiem</p>
          </div>

          <div className="embedBadge">{progress}%</div>
        </div>

        <div className="embedProgressLine">
          <div style={{ width: `${progress}%` }} />
        </div>

        <div className="embedMeta">
          <span>0</span>
          <strong>
            {format(currentSteps)} / {format(goal)}
          </strong>
          <span>{format(goal)}</span>
        </div>

        <div className="embedNext">
          <span>Nākamais mērķis</span>
          <b>
            <CheckpointIcon checkpoint={next} /> {next.title}
          </b>
          <strong>Vēl {format(stepsUntilNext)} soļi</strong>
        </div>
      </section>
    </main>
  );
}

function DepartmentsEmbed({ topDepartments, otherDepartments, maxDepartmentAverage }) {
  return (
    <main className="embedPage">
      <section className="embedCard">
        <h1 className="embedTitle">Nodaļu reitings</h1>

        <p className="embedDescription">
          TOP skaitļi rāda nodaļas vidējo kopējo iesniegto soļu skaitu uz vienu dalībnieku.
        </p>

        {topDepartments.length > 0 ? (
          <>
            <div className="embedPodium">
              {topDepartments.map((d, index) => {
                const placeClass = index === 0 ? "first" : index === 1 ? "second" : "third";
                const placeLabel = index === 0 ? "1. vieta" : index === 1 ? "2. vieta" : "3. vieta";
                const icon = index === 0 ? "🏆" : index === 1 ? "🥾" : "🚶";

                return (
                  <div className={`embedPodiumCard ${placeClass}`} key={d.name}>
                    <div className="embedPodiumIcon">{icon}</div>

                    <div className="embedPodiumBar">
                      <span>{placeLabel}</span>
                      <b>{format(d.average)}</b>
                      <small>vidēji uz dalībnieku</small>
                    </div>

                    <h2>{d.name}</h2>
                    <p>
                      {format(d.steps)} kopā · {d.participants} {pluralParticipants(d.participants)}
                    </p>
                  </div>
                );
              })}
            </div>

            {otherDepartments.length > 0 && (
              <div className="embedOtherDepartments">
                {otherDepartments.map((d, index) => {
                  const barWidth = Math.max(8, Math.round((d.average / maxDepartmentAverage) * 100));

                  return (
                    <div className="embedOtherDeptRow" key={d.name}>
                      <span>{index + 4}</span>

                      <div>
                        <div className="embedOtherDeptTop">
                          <b>{d.name}</b>
                          <strong>{format(d.average)}</strong>
                        </div>

                        <div className="embedOtherDeptBar">
                          <div style={{ width: `${barWidth}%` }} />
                        </div>

                        <p>
                          {format(d.steps)} kopā · {d.participants} {pluralParticipants(d.participants)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <p className="muted">Nodaļu dati vēl nav iesniegti.</p>
        )}
      </section>
    </main>
  );
}

function Row({ rank, name, value, small }) {
  return (
    <div className={`personRow ${small ? "small" : ""}`}>
      <span>
        <b>{rank}.</b> {name}
      </span>
      <strong>{value}</strong>
    </div>
  );
}

function Step({ n, title, text }) {
  return (
    <div className="stepCard">
      <b>{n}</b>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
