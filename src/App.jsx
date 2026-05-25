
import React from "react";
import "./style.css";

const GOAL = 25000000;
const currentSteps = 7842160;
const submitFormUrl = "https://forms.office.com/";

const checkpoints = [
  { steps: 50000, icon: "🚶", title: "Pirmais jubilejas starts" },
  { steps: 500000, icon: "🇱🇻", title: "Apieta apkārt Latvija" },
  { steps: 1000000, icon: "🌊", title: "Noieta Daugava" },
  { steps: 2000000, icon: "🐚", title: "Noiets Camino de Santiago" },
  { steps: 3000000, icon: "🧱", title: "Noiets Ķīnas mūris" },
  { steps: 7000000, icon: "⚓", title: "Apieta apkārt Baltijas jūra" },
  { steps: 12000000, icon: "🇪🇺", title: "Apieta apkārt Eiropa" },
  { steps: 15000000, icon: "🏜️", title: "Noieta Nīla" },
  { steps: 20000000, icon: "🏔️", title: "Šķērsota Eirāzija" },
  { steps: 25000000, icon: "🌍", title: "Nostaigāta gandrīz puse pasaules" },
];

const walkers = Array.from({ length: 100 }, (_, i) => ({
  name: `Darbinieks ${i + 1}`,
  steps: Math.max(12000, 125000 - i * 900),
}));

const departments = [
  { name: "Elektronisko sakaru un pasta departaments", steps: 1842000, participants: 16 },
  { name: "Enerģētikas departaments", steps: 1765000, participants: 14 },
  { name: "Ūdenssaimniecības, depozīta sistēmas un atkritumu departaments", steps: 1698000, participants: 12 },
  { name: "Ekonomiskās analīzes departaments", steps: 1512000, participants: 9 },
  { name: "Juridiskais departaments", steps: 1484000, participants: 8 },
  { name: "Administratīvais departaments", steps: 1397000, participants: 10 },
  { name: "Cilvēkresursu attīstības un pārvaldības nodaļa", steps: 1210000, participants: 4 },
  { name: "Komunikācijas nodaļa", steps: 1183000, participants: 3 },
  { name: "Padome", steps: 990000, participants: 2 },
].map(d => ({...d, average: Math.round(d.steps / d.participants)}));

function format(n){ return new Intl.NumberFormat("lv-LV").format(n); }

export default function App(){
  const progress = Math.round((currentSteps / GOAL) * 100);
  const next = checkpoints.find(c => c.steps > currentSteps) || checkpoints[checkpoints.length - 1];
  const reached = checkpoints.filter(c => c.steps <= currentSteps).length;
  const embedCode = `<iframe src="https://tava-lapa.lv/progress" width="100%" height="260" style="border:0;" title="Regulatora soļu izaicinājuma progress"></iframe>`;

  return (
    <main>
      <div className="page">
        <nav className="topbar">
         <div className="brand">
  <img
    src="/src/sprk25-logo.png.png"
    alt="SPRK 25"
    className="sprk-logo"
  />
</div>
          <a className="button" href={submitFormUrl} target="_blank">Iesniegt soļus</a>
        </nav>

        <section className="heroShell">
          <div className="heroText">
            <p className="eyebrow">25 gadi · 25 miljoni soļu</p>
            <h1>Regulatora soļu izaicinājums</h1>
            <p className="lead">
              🎉 Svinot Regulatora 25 gadu jubileju, aicinām visus regulatora darbiniekus pievienoties kopīgam soļu izaicinājumam — jubilejas gada laikā kopā noiet 25 miljonus soļu! 👣
            </p>
            <p className="lead smaller">
              25 miljoni izklausās daudz, bet, ja piedalās ap 50 kolēģu, katram gada laikā vidēji jānoiet ap 500 000 soļu — aptuveni 10 000 soļu nedēļā.
            </p>
          </div>

          <div className="journeyArt" aria-label="Ceļojuma ilustrācija">
            <span>🏜️</span>
            <span>🌊</span>
            <span>⛰️</span>
            <span>🗼</span>
            <span>🧱</span>
            <span>🌍</span>
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
              <div className="fill" style={{width: `${progress}%`}} />
            </div>

            <div className="progressMeta">
              <span>0</span>
              <strong>{format(currentSteps)} / {format(GOAL)} soļu</strong>
              <span>{format(GOAL)}</span>
            </div>
          </div>

          <div className="nextInline">
            <div>
              <p>Nākamais sasniedzamais mērķis</p>
              <h3>{next.icon} {next.title}</h3>
            </div>
            <strong>Vēl {format(next.steps - currentSteps)} soļi</strong>
          </div>

          <div className="checkpointStrip">
            {checkpoints.map(c => {
              const done = c.steps <= currentSteps;
              const hidden = c.steps > next.steps;
              return (
                <div className={`miniCheckpoint ${done ? "done" : ""} ${hidden ? "mystery" : ""}`} key={c.steps}>
                  {hidden ? (
                    <span className="question">?</span>
                  ) : (
                    <>
                      <div className="cpIcon">{c.icon}</div>
                      <b>{format(c.steps)} soļu</b>
                      <p>{c.title}</p>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <div className="notice">
            <b>Soļu progress tiek atjaunots reizi nedēļā — pirmdienās.</b>
            <span>Aicinām darbiniekus iesūtīt soļu skaitu līdz katras svētdienas beigām.</span>
          </div>

          <div className="heroActions">
            <a className="button" href={submitFormUrl} target="_blank">Iesniegt savus soļus →</a>
            <a className="button secondary" href="#ka-piedalities">Skatīt noteikumus</a>
          </div>
        </section>

        <section className="summaryGrid">
          <div className="summaryCard next">
            <p>📍 Nākamais sasniedzamais mērķis</p>
            <div className="nextIcon">{next.icon}</div>
            <h2>{next.title}</h2>
            <span>Vēl {format(next.steps - currentSteps)} soļi līdz sasniegšanai</span>
          </div>
          <div className="summaryCard">
            <h2>50</h2>
            <p>Piedalās SPRK darbinieku</p>
          </div>
          <div className="summaryCard">
            <h2>{reached}/{checkpoints.length}</h2>
            <p>Sasniegti checkpointi</p>
          </div>
        </section>

        <section className="contentGrid">
          <div className="card">
            <div className="sectionHeader">
              <div>
                <h2>Iepriekšējās nedēļas aktīvākie soļotāji</h2>
                <p>TOP 5 lielākais soļu skaits pēdējā nedēļā</p>
              </div>
              <b>TOP 5</b>
            </div>
            {walkers.slice(0,5).map((w,i)=><Row key={w.name} rank={i+1} name={w.name} value={format(w.steps)} />)}

            <div className="ranking">
              <h3>Kopējais staigātāju reitings</h3>
              {walkers.map((w,i)=><Row key={w.name} rank={i+1} name={w.name} value={format(w.steps)} small />)}
            </div>
          </div>

          <div className="card">
            <h2>Nodaļu reitings</h2>
            <p className="muted">Lai reitings būtu godīgs arī starp dažāda lieluma nodaļām, tas tiek aprēķināts pēc vidējā soļu skaita uz vienu dalībnieku.</p>
            {departments.sort((a,b)=>b.average-a.average).map((d,i)=>
              <div className="deptRow" key={d.name}>
                <div className="rank">{i+1}</div>
                <div className="deptName">
                  <b>{d.name}</b>
                  <span>{format(d.steps)} kopā · {d.participants} dalībnieki</span>
                </div>
                <div className="avg">
                  <b>{format(d.average)}</b>
                  <span>vidēji</span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="contentGrid lower">
          <div className="card">
            <h2>Regnet embed kods progress skalai</h2>
            <p className="muted">Šo kodu var izmantot, lai Regnet lapā ieliktu mazo progress bloku ar aktuālo noieto soļu skaitu, mērķa skalu un atgādinājumu.</p>
            <div className="embedPreview">
              <b>👣 Šobrīd esam nogājuši {format(currentSteps)} soļu</b>
              <div className="simpleBar"><div style={{width: `${progress}%`}} /></div>
              <p>{progress}% no mērķa sasniegti · Mērķis: {format(GOAL)} soļu</p>
              <small>Progress tiek atjaunots pirmdienās. Lūdzu iesūti soļus līdz svētdienas beigām.</small>
            </div>
            <textarea readOnly value={embedCode}></textarea>
          </div>

          <div className="card" id="ka-piedalities">
            <h2>Kā piedalīties un iesniegt savus soļus</h2>
            <div className="stepsGrid">
              <Step n="1" title="Atver savu soļu lietotni" text="Apple Health, Samsung Health, Garmin, Fitbit, Google Fit vai citu lietotni."/>
              <Step n="2" title="Uzņem ekrānšāviņu" text="Lai redzams soļu skaits un, ja iespējams, datums vai periods."/>
              <Step n="3" title="Aizpildi anketu" text="Ievadi vārdu, soļu skaitu un pievieno ekrānšāviņu."/>
              <Step n="4" title="Palīdzi sasniegt checkpointus" text="Katrs iesniegtais solis papildina kopējo progresu."/>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Row({rank, name, value, small}) {
  return (
    <div className={`personRow ${small ? "small" : ""}`}>
      <span><b>{rank}.</b> {name}</span>
      <strong>{value}</strong>
    </div>
  )
}

function Step({n, title, text}) {
  return (
    <div className="stepCard">
      <b>{n}</b>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}
