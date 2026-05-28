import React, { useEffect, useState } from "react";
import "./style.css";
import sprkLogo from "./sprk25-logo.png";
import journeyImage from "./sprk-celojums.png";

const GOAL = 25000000;
const DATA_URL = "/data.json";
const submitFormUrl = "https://forms.office.com/";

const checkpoints = [
  { steps: 50000, icon: "walk", title: "Pirmie 50 (tūkstoši) – jubilejas starts" },
  { steps: 500000, icon: "latvia", title: "Apiesim apkārt Latvijai" },
  { steps: 1000000, icon: "river", title: "Noiesim Daugavu visā tās garumā" },
  { steps: 2000000, icon: "shell", title: "Noiesim Camino de Santiago ceļu" },
  { steps: 3000000, icon: "wall", title: "Noiets Ķīnas mūris" },
  { steps: 7000000, icon: "anchor", title: "Apiesim apkārt Baltijas jūras līcim" },
  { steps: 12000000, icon: "eu", title: "Apiesim apkārt Eiropai" },
  { steps: 15000000, icon: "desert", title: "Noiesim upi Nīla visā tās garumā" },
  { steps: 20000000, icon: "mountain", title: "Šķērsojam kontintentu – Eirāzija" },
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
      <svg
        viewBox="0 0 498 299"
        className="latviaSvg"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
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
          <polygon
            key={index}
            points={makeStarPoints(star.x, star.y)}
            fill="#FFD84D"
          />
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
            <p>Sasniegtie mērķi </p>
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
  <div className="card instructionCard illustratedInstructionCard" id="ka-piedalities">
    <h2>Kā piedalīties un iesniegt savus soļus</h2>

    <p className="instructionIntro">
      Šis izaicinājums ir par aktīvāku ikdienu un kopīgu mērķi — sasniegt 25 miljonus soļu Regulatora 25 gadu jubilejā. Mērķis nav tikai nonākt līdz nākamajam pieturpunktam kartē, bet arī ikdienā kustēties vairāk: izvēlēties pastaigu, kāpnes, īsu izkustēšanos pusdienlaikā vai garāku maršrutu mājup.
    </p>

    <div className="illustratedStepsGrid">
      <InstructionStep
        n="1"
        title="Atver lietotni, kurā redzi savus soļus"
        text={
          <>
            <b>iPhone:</b> Health / Veselība → Browse / Pārlūkot → Activity / Aktivitāte → Steps / Soļi.
            <br />
            <br />
            <b>Android:</b> atver savu aktivitāšu lietotni, piemēram, Samsung Health, Google Fit, Fitbit vai citu soļu lietotni, un atrodi sadaļu Steps / Soļi.
          </>
        }
        illustration={<PhoneStepsIllustration />}
      />

      <InstructionStep
        n="2"
        title="Atrodi nedēļas soļu skaitu"
        text="Apskati soļu skaitu par periodu no pirmdienas līdz svētdienai. Daudzas ierīces un lietotnes nedēļas kopējo soļu skaitu rāda automātiski. Ja redzi tikai dienu rezultātus, saskaiti kopā visu septiņu dienu soļus."
        illustration={<WeekStepsIllustration />}
      />

      <InstructionStep
        n="3"
        title="Iesniedz kopējo skaitu anketā"
        text="Spied pogu “Iesniegt soļus” un Microsoft Forms anketā ievadi savu nodaļu un nedēļas kopējo soļu skaitu. Iesniedzējs tiek reģistrēts automātiski, tāpēc vārds atsevišķi nav jāievada. Soļu laukā raksti tikai skaitli."
        illustration={<FormIllustration />}
      />

      <InstructionStep
        n="4"
        title="Seko līdzi progresam un kusties vairāk"
        text="Pirmdienās dati tiek atjaunoti šajā lapā. Katrs iesniegtais rezultāts papildina kopējo 25 miljonu soļu mērķi, individuālo reitingu un nodaļas rezultātu."
        illustration={<ProgressIllustration />}
      />
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
          <span>Nākamais mērķis, ko vēlamies kopā sasniegt </span>
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
function InstructionStep({ n, title, text, illustration }) {
  return (
    <div className="instructionStepCard">
      <div className="instructionStepTop">
        <b>{n}</b>
        <h3>{title}</h3>
      </div>

      <p>{text}</p>

      <div className="instructionIllustration">
        {illustration}
      </div>
    </div>
  );
}

function PhoneStepsIllustration() {
  return (
    <svg viewBox="0 0 360 220" className="instructionSvg" xmlns="http://www.w3.org/2000/svg" role="img">
      <rect x="26" y="18" width="122" height="184" rx="20" fill="#123B63" />
      <rect x="38" y="36" width="98" height="148" rx="10" fill="#FFFFFF" />
      <rect x="68" y="28" width="38" height="6" rx="3" fill="#0F2F50" />

      <rect x="52" y="54" width="72" height="24" rx="6" fill="#eef3f9" />
      <text x="66" y="70" fontSize="10" fill="#123B63" fontWeight="700">Health</text>

      <text x="56" y="102" fontSize="10" fill="#123B63">Browse →</text>
      <text x="56" y="128" fontSize="10" fill="#123B63">Activity →</text>
      <text x="56" y="154" fontSize="10" fill="#123B63">Steps</text>

      <rect x="184" y="46" width="140" height="128" rx="14" fill="#f8fbff" stroke="#d8e2ee" />
      <text x="222" y="70" fontSize="13" fill="#123B63" fontWeight="800">Android</text>

      <circle cx="208" cy="98" r="9" fill="#7bbf6a" />
      <text x="224" y="102" fontSize="10" fill="#123B63">Samsung Health</text>

      <circle cx="208" cy="124" r="9" fill="#37b4c5" />
      <text x="224" y="128" fontSize="10" fill="#123B63">Google Fit</text>

      <circle cx="208" cy="150" r="9" fill="#123B63" />
      <text x="224" y="154" fontSize="10" fill="#123B63">Steps / Soļi</text>

      <path d="M151 110 C165 110 170 110 184 110" fill="none" stroke="#9fb3c8" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
}

function WeekStepsIllustration() {
  const days = [
    ["P", 8520, 42],
    ["O", 9310, 48],
    ["T", 7650, 38],
    ["C", 10240, 56],
    ["Pk", 8980, 45],
    ["S", 12130, 66],
    ["Sv", 9170, 47],
  ];

  return (
    <svg viewBox="0 0 360 220" className="instructionSvg" xmlns="http://www.w3.org/2000/svg" role="img">
      <rect x="26" y="28" width="308" height="112" rx="12" fill="#FFFFFF" stroke="#d8e2ee" />
      <text x="116" y="52" fontSize="13" fill="#123B63" fontWeight="800">Pirmdiena – Svētdiena</text>

      {days.map(([day, steps, height], index) => {
        const x = 54 + index * 38;
        return (
          <g key={day}>
            <text x={x} y="80" fontSize="11" fill="#123B63" fontWeight="800">{day}</text>
            <text x={x - 8} y="99" fontSize="8" fill="#64748b">{steps}</text>
            <rect x={x - 4} y={124 - height} width="16" height={height} rx="4" fill="#cfe0f2" />
          </g>
        );
      })}

      <rect x="54" y="156" width="252" height="46" rx="12" fill="#f8fbff" stroke="#d8e2ee" />
      <circle cx="86" cy="179" r="17" fill="#123B63" />
      <text x="115" y="174" fontSize="12" fill="#64748b">Nedēļas kopējais soļu skaits</text>
      <text x="136" y="195" fontSize="26" fill="#123B63" fontWeight="900">65 000</text>
    </svg>
  );
}

function FormIllustration() {
  return (
    <svg viewBox="0 0 360 220" className="instructionSvg" xmlns="http://www.w3.org/2000/svg" role="img">
      <rect x="76" y="28" width="208" height="170" rx="12" fill="#FFFFFF" stroke="#123B63" strokeWidth="6" />
      <rect x="134" y="18" width="92" height="30" rx="8" fill="#5d6f82" />
      <circle cx="180" cy="20" r="8" fill="#f4f7fb" />

      <text x="124" y="70" fontSize="16" fill="#123B63" fontWeight="900">Iesniegt soļus</text>

      <text x="96" y="100" fontSize="10" fill="#123B63" fontWeight="700">Nodaļa</text>
      <rect x="96" y="106" width="168" height="24" rx="5" fill="#f8fbff" stroke="#d8e2ee" />
      <text x="106" y="122" fontSize="9" fill="#64748b">Komunikācijas nodaļa</text>

      <text x="96" y="146" fontSize="10" fill="#123B63" fontWeight="700">Soļu skaits nedēļā</text>
      <rect x="96" y="152" width="168" height="24" rx="5" fill="#f8fbff" stroke="#d8e2ee" />
      <text x="106" y="168" fontSize="9" fill="#64748b">65000</text>

      <rect x="96" y="184" width="168" height="26" rx="5" fill="#123B63" />
      <text x="145" y="202" fontSize="11" fill="#FFFFFF" fontWeight="800">Iesniegt</text>
    </svg>
  );
}

function ProgressIllustration() {
  return (
    <svg viewBox="0 0 360 220" className="instructionSvg" xmlns="http://www.w3.org/2000/svg" role="img">
      <rect x="28" y="34" width="160" height="78" rx="10" fill="#FFFFFF" stroke="#d8e2ee" />
      <text x="44" y="58" fontSize="10" fill="#123B63" fontWeight="900">KOPĪGAIS MĒRĶIS</text>
      <text x="44" y="82" fontSize="18" fill="#123B63" fontWeight="900">25 000 000</text>
      <text x="144" y="82" fontSize="10" fill="#123B63">soļu</text>

      <rect x="44" y="94" width="120" height="12" rx="6" fill="#dbe4ef" />
      <rect x="44" y="94" width="75" height="12" rx="6" fill="#7bbf6a" />
      <text x="170" y="104" fontSize="10" fill="#123B63">62%</text>

      <path d="M224 62 L245 48 L268 62 L291 54 L316 72 L307 96 L278 94 L257 105 L235 94 Z" fill="none" stroke="#9E3039" strokeWidth="3" />
      <circle cx="277" cy="76" r="5" fill="#9E3039" />

      <path d="M66 164 C92 138 119 148 144 130 C174 108 210 134 238 112 C262 94 288 106 310 86" fill="none" stroke="#123B63" strokeWidth="3" strokeDasharray="5 5" />
      <path d="M282 132 L322 92 L312 136" fill="none" stroke="#7bbf6a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

      <circle cx="120" cy="164" r="11" fill="#123B63" />
      <path d="M120 176 L112 198 M120 176 L132 196 M118 182 L98 176 M122 182 L142 176" stroke="#123B63" strokeWidth="5" strokeLinecap="round" />

      <circle cx="190" cy="156" r="11" fill="#37b4c5" />
      <path d="M190 168 L182 198 M190 168 L204 194 M187 176 L166 170 M194 176 L215 166" stroke="#37b4c5" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
