import React, { useEffect, useState } from "react";
import "./style.css";
import sprkLogo from "./sprk25-logo.png";
import journeyImage from "./sprk-celojums.png";

const GOAL = 25000000;
const DATA_URL = "/data.json";
const submitFormUrl = "https://forms.office.com/e/EPmKCNTLJg";

const checkpoints = [
  { steps: 50000, icon: "walk", title: "Pirmie 50 (tūkstoši) – jubilejas starts" },
  { steps: 500000, icon: "latvia", title: "Apiesim apkārt Latvijai" },
  { steps: 1000000, icon: "river", title: "Noiesim Daugavu visā tās garumā" },
  { steps: 2000000, icon: "shell", title: "Noiesim Camino de Santiago ceļu" },
  { steps: 3000000, icon: "wall", title: "Noiets Ķīnas mūris" },
  { steps: 7000000, icon: "anchor", title: "Apiesim apkārt Baltijas jūrai" },
  { steps: 12000000, icon: "eu", title: "Apiesim apkārt Eiropai" },
  { steps: 15000000, icon: "desert", title: "Noiesim upi Nīla visā tās garumā" },
  { steps: 20000000, icon: "mountain", title: "Šķērsojam kontinentu – Eirāzija" },
  { steps: 25000000, icon: "globe", title: "Nostaigāsim gandrīz pusi pasaules" },
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
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

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
      return <LatviaShapeIcon />;
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

function LatviaShapeIcon() {
  return (
    <span className="latviaIcon" aria-label="Latvijas kontūra" title="Latvija">
      <svg viewBox="0 0 498 299" className="latviaSvg" xmlns="http://www.w3.org/2000/svg" role="img">
        <defs>
          <clipPath id="latviaRealClip">
            <path d="M 489 191 L 465 138 L 449 131 L 454 87 L 431 58 L 400 51 L 355 55 L 332 28 L 313 26 L 286 8 L 275 8 L 217 36 L 223 103 L 213 125 L 199 136 L 176 132 L 157 100 L 134 80 L 118 55 L 104 54 L 84 67 L 56 73 L 39 102 L 33 141 L 13 169 L 8 246 L 18 262 L 35 263 L 58 237 L 85 226 L 139 228 L 147 234 L 202 226 L 216 239 L 270 230 L 274 241 L 303 241 L 326 250 L 365 287 L 392 290 L 414 275 L 457 265 L 464 241 L 487 217 Z" />
          </clipPath>
        </defs>

        <path
          d="M 489 191 L 465 138 L 449 131 L 454 87 L 431 58 L 400 51 L 355 55 L 332 28 L 313 26 L 286 8 L 275 8 L 217 36 L 223 103 L 213 125 L 199 136 L 176 132 L 157 100 L 134 80 L 118 55 L 104 54 L 84 67 L 56 73 L 39 102 L 33 141 L 13 169 L 8 246 L 18 262 L 35 263 L 58 237 L 85 226 L 139 228 L 147 234 L 202 226 L 216 239 L 270 230 L 274 241 L 303 241 L 326 250 L 365 287 L 392 290 L 414 275 L 457 265 L 464 241 L 487 217 Z"
          fill="#9E3039"
        />

        <g clipPath="url(#latviaRealClip)">
          <rect x="0" y="125.6" width="498" height="47.8" fill="#FFFFFF" />
        </g>
      </svg>
    </span>
  );
}

function EUFlagIcon() {
  const centerX = 18;
  const centerY = 12;
  const radius = 5.8;

  const makeStarPoints = (cx, cy, outer = 1.05, inner = 0.45) => {
    const points = [];

    for (let i = 0; i < 10; i += 1) {
      const angle = (-90 + i * 36) * (Math.PI / 180);
      const r = i % 2 === 0 ? outer : inner;
      points.push(`${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`);
    }

    return points.join(" ");
  };

  const stars = Array.from({ length: 12 }, (_, index) => {
    const angle = (-90 + index * 30) * (Math.PI / 180);

    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  });

  return (
    <span className="flagIcon" aria-label="Eiropas Savienības karogs" title="Eiropas Savienība">
      <svg viewBox="0 0 36 24" className="flagSvg" xmlns="http://www.w3.org/2000/svg" role="img">
        <rect width="36" height="24" rx="4" fill="#1E4FA1" />

        {stars.map((star, index) => (
          <polygon key={index} points={makeStarPoints(star.x, star.y)} fill="#FFD84D" />
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
              🎉 Svinot Regulatora 25 gadu jubileju, aicinām darbiniekus pievienoties kopīgam soļu izaicinājumam – jubilejas gadā kopā noiet 25 miljonus soļu! 👣
              Šajā lapā atradīsi katras nodaļas progresu, kopējo noeieto soļu skaitu un to, kuri bijuši iepriekšējās nedēļas aktīvākie staigātāji. Mērķis ir ne vien vairāk kustēties, bet arī mums kopīgi sasniegt — šoreiz gan virtuāli — dažādas virsotnes, pabūt dažādās pasaules malās un simboliski atzīmēt Regulatora dzimšanas dienu.
            </p>

            <p className="lead smaller">
              Soļu kopskaits par pēdējām 7 dienām jāiesniedz līdz svētdienas vakaram, lai pirmdienās Regulatora komunikācijas speciāliste Anna var šeit atjaunot kopējo progresu.
              Ja ar to vajag palīdzību – droši raksti vai ziņo komunikācijas speciālistei Annai, un viņa ar prieku palīdzēs!
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
            <b>Soļu progress tiek atjaunots reizi nedēļā — pirmdienu rītos.</b>
            <span>Darbinieki aicināti iesūtīt savu soļu skaitu līdz katras svētdienas beigām.</span>
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
            <p>Sasniegtie mērķi</p>
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
          <div className="card instructionCard improvedInstructionCard" id="ka-piedalities">
            <h2>Kā piedalīties un iesniegt savus soļus</h2>

            <p className="instructionIntro">
              Šis izaicinājums ir par aktīvāku ikdienu un kopīgu mērķi — sasniegt 25 miljonus soļu Regulatora 25 gadu jubilejā.
              Mērķis nav tikai nonākt līdz nākamajam pieturpunktam kartē, bet arī ikdienā kustēties vairāk:
              iziet īsā pastaigā, izvēlēties kāpnes lifta vietā vai vienkārši biežāk izkustēties dienas laikā.
            </p>

            <div className="instructionStepsScroller">
              <div className="improvedStepsRow">
                <InstructionStep
                  n="1"
                  title="Atver lietotni, kurā redzi savus soļus"
                  text={
                    <>
                      <b>iPhone:</b> atver <b>Health / Veselība</b> lietotni. Ja soļi nav redzami sākumskatā, atver <b>Browse / Pārlūkot</b>, izvēlies <b>Activity / Aktivitāte</b> un pēc tam <b>Steps / Soļi</b>.
                      <br />
                      <br />
                      <b>Android:</b> atver lietotni, kurā ikdienā skaties aktivitātes, piemēram, <b>Samsung Health</b>, <b>Google Fit</b>, <b>Fitbit</b> vai citu soļu lietotni, un atrodi sadaļu <b>Steps / Soļi</b>.
                    </>
                  }
                  visual={<StepOneVisual />}
                />

                <InstructionStep
                  n="2"
                  title="Atrodi nedēļas soļu skaitu"
                  text={
                    <>
                      Apskati soļu skaitu par periodu no <b>pirmdienas līdz svētdienai</b>. Daudzas ierīces un lietotnes nedēļas kopējo soļu skaitu rāda automātiski. Ja redzi katras dienas soļus atsevišķi, saskaiti kopā visu septiņu dienu rezultātus un iegūto kopsummu ievadi anketā.
                    </>
                  }
                  visual={<StepTwoVisual />}
                />

                <InstructionStep
                  n="3"
                  title="Iesniedz kopējo skaitu anketā"
                  text={
                    <>
                      Spied pogu <b>“Iesniegt soļus”</b> un Microsoft Forms anketā ievadi savu <b>nodaļu</b> un <b>nedēļas kopējo soļu skaitu</b>. Tavs lietotāja konts tiek reģistrēts automātiski, tāpēc vārds atsevišķi nav jāievada. Soļu laukā raksti tikai skaitli — piemēram, <b>65000</b>.
                    </>
                  }
                  visual={<StepThreeVisual />}
                />

                <InstructionStep
                  n="4"
                  title="Seko līdzi progresam un kusties vairāk"
                  text={
                    <>
                      Pirmdienās dati tiek atjaunoti šajā lapā. Katrs iesniegtais rezultāts papildina kopējo 25 miljonu soļu mērķi, individuālo reitingu un nodaļas rezultātu. Jo biežāk kustamies ikdienā, jo ātrāk sasniedzam nākamo pieturpunktu mūsu kopīgajā ceļā.
                    </>
                  }
                  visual={<StepFourVisual />}
                />
              </div>
            </div>

            <div className="instructionNote">
              <b>Svarīgi:</b>
              <span>
                Katrs solis ir svarīgs. Izaicinājuma mērķis ir gan sasniegt kopīgos pieturpunktus, gan ikdienā kustēties vairāk, justies labāk un stiprināt veselīgākus paradumus.
              </span>
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
          <span>Nākamais mērķis, ko vēlamies kopā sasniegt</span>
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

function InstructionStep({ n, title, text, visual }) {
  return (
    <div className="improvedStepCard">
      <div className="improvedStepHeader">
        <div className="improvedStepNumber">{n}</div>
        <h3>{title}</h3>
      </div>

      <p>{text}</p>

      <div className="improvedStepVisual">{visual}</div>
    </div>
  );
}

function StepOneVisual() {
  return (
    <div className="instructionImagePanel">
      <span className="instructionImageLabel">📱 Soļu skats lietotnēs</span>

      <div className="screenshotsGrid">
        <div className="screenshotCard">
          <div className="screenshotWrap">
            <img src="/images/iphone-steps.png" alt="iPhone Health soļu skats" />
          </div>
          <span className="deviceBadge">iPhone</span>
        </div>

        <div className="screenshotCard">
          <div className="screenshotWrap">
            <img src="/images/android-steps.png" alt="Android soļu skats" />
          </div>
          <span className="deviceBadge">Android</span>
        </div>
      </div>

      <div className="pathLine">
        <span>Health</span>
        <i>→</i>
        <span>Browse</span>
        <i>→</i>
        <span>Activity</span>
        <i>→</i>
        <span>Steps</span>
      </div>

      <div className="smallInstructionNote">
        Ja lieto viedpulksteni vai aktivitāšu aproci, soļi parasti automātiski tiek sinhronizēti tajā pašā lietotnē.
      </div>
    </div>
  );
}

function StepTwoVisual() {
  return (
    <div className="instructionImagePanel">
      <span className="instructionImageLabel">📊 Nedēļas kopsavilkums</span>

      <div className="weekVisual">
        <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nedēļas soļu kopsavilkums">
          <rect width="360" height="300" fill="#ffffff" />
          <rect x="18" y="18" width="324" height="264" rx="12" fill="#f8fbff" stroke="#d8e2ee" />
          <text x="180" y="47" textAnchor="middle" fill="#123B63" fontSize="16" fontWeight="800">
            Pirmdiena – Svētdiena
          </text>

          <g transform="translate(38,72)">
            <line x1="0" y1="118" x2="284" y2="118" stroke="#d8e2ee" />
            <line x1="0" y1="78" x2="284" y2="78" stroke="#edf2f7" />
            <line x1="0" y1="38" x2="284" y2="38" stroke="#edf2f7" />

            {[
              ["P", 75, 43, 0],
              ["O", 70, 48, 44],
              ["T", 80, 38, 88],
              ["C", 58, 60, 132],
              ["Pk", 72, 46, 176],
              ["S", 42, 76, 220],
              ["Sv", 70, 48, 264],
            ].map(([day, y, h, x]) => (
              <g key={day} transform={`translate(${x},0)`}>
                <text x="12" y="142" textAnchor="middle" fill="#123B63" fontSize="12" fontWeight="800">
                  {day}
                </text>
                <rect x="4" y="64" width="16" height="54" fill="#e4edf7" />
                <rect x="4" y={y} width="16" height={h} fill="#9bbddd" />
              </g>
            ))}
          </g>

          <g transform="translate(36,225)">
            <rect width="288" height="44" rx="8" fill="#ffffff" stroke="#d8e2ee" />
            <text x="18" y="19" fill="#64748b" fontSize="12">
              Nedēļā kopā
            </text>
            <text x="18" y="36" fill="#123B63" fontSize="20" fontWeight="900">
              65 000
            </text>
            <text x="144" y="19" fill="#64748b" fontSize="12">
              Jāiesniedz
            </text>
            <text x="144" y="36" fill="#123B63" fontSize="15" fontWeight="800">
              viens kopējais skaitlis
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function StepThreeVisual() {
  return (
    <div className="instructionImagePanel">
      <span className="instructionImageLabel">📝 Microsoft Forms anketa</span>

      <div className="formsVisual">
        <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Microsoft Forms anketas skats">
          <rect width="360" height="300" fill="#ffffff" />
          <rect x="26" y="20" width="308" height="260" rx="12" fill="#f8fbff" stroke="#d8e2ee" />
          <rect x="26" y="20" width="308" height="46" rx="12" fill="#123B63" />
          <text x="46" y="50" fill="#ffffff" fontSize="17" fontWeight="900">
            Iesniegt soļus
          </text>

          <rect x="48" y="86" width="264" height="48" rx="8" fill="#ffffff" stroke="#d8e2ee" />
          <text x="62" y="106" fill="#123B63" fontSize="12" fontWeight="800">
            Nodaļa
          </text>
          <text x="62" y="125" fill="#64748b" fontSize="13">
            Komunikācijas nodaļa
          </text>

          <rect x="48" y="150" width="264" height="48" rx="8" fill="#ffffff" stroke="#d8e2ee" />
          <text x="62" y="170" fill="#123B63" fontSize="12" fontWeight="800">
            Soļu skaits nedēļā
          </text>
          <text x="62" y="189" fill="#64748b" fontSize="13">
            65000
          </text>

          <rect x="48" y="214" width="116" height="34" rx="6" fill="#123B63" />
          <text x="106" y="236" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">
            Iesniegt
          </text>

          <rect x="182" y="214" width="130" height="34" rx="6" fill="#ffffff" stroke="#d8e2ee" />
          <text x="247" y="236" textAnchor="middle" fill="#123B63" fontSize="12" fontWeight="800">
            līdz pirmdienai 11.00
          </text>
        </svg>
      </div>

      <div className="smallInstructionNote">
        Soļu kopskaits jāiesniedz katru pirmdienu līdz plkst. 11.00.
      </div>
    </div>
  );
}

function StepFourVisual() {
  return (
    <div className="hikePhoto">
      <img src="/images/hiking-steps.jpg" alt="Pārgājiena foto" />

      <div className="hikeTop" />
      <div className="hikeBottom" />

      <div className="hikeCaption">
        <strong>Kustība turpinās</strong>
        <span>Katrs iesniegtais rezultāts ir viens posms kopīgajā maršrutā uz nākamo mērķi.</span>
      </div>

      <svg className="routeOverlay" viewBox="0 0 320 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M10 56 C55 32 97 47 136 30 C171 14 206 30 246 17 C274 7 295 8 309 13"
          fill="none"
          stroke="rgba(255,255,255,.95)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 8"
        />
        <path
          d="M297 13 L309 13 L302 25"
          fill="none"
          stroke="rgba(182,234,149,.98)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
